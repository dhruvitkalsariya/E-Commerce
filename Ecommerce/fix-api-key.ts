import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createApiKeysWorkflow, linkSalesChannelsToApiKeyWorkflow } from "@medusajs/medusa/core-flows";

export default async function fixApiKey({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const apiKeyModuleService = container.resolve(Modules.API_KEY);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  logger.info("Fixing API key setup...");

  // Delete existing publishable keys
  const existingKeys = await apiKeyModuleService.listApiKeys();
  const publishableKeys = existingKeys.filter(key => key.type === "publishable");
  
  for (const key of publishableKeys) {
    logger.info(`Deleting existing publishable key: ${key.id}`);
    await apiKeyModuleService.deleteApiKey(key.id);
  }

  // Get sales channel
  const salesChannels = await salesChannelModuleService.listSalesChannels();
  if (salesChannels.length === 0) {
    logger.error("No sales channels found!");
    return;
  }

  const salesChannel = salesChannels[0];
  logger.info(`Using sales channel: ${salesChannel.name} (${salesChannel.id})`);

  // Create new publishable key
  logger.info("Creating new publishable API key...");
  const { result: apiKeyResult } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "Frontend Store",
          type: "publishable",
          created_by: "",
        },
      ],
    },
  });

  const newApiKey = apiKeyResult[0];
  logger.info(`Created new API key: ${newApiKey.id}`);

  // Link to sales channel
  logger.info("Linking API key to sales channel...");
  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: newApiKey.id,
      add: [salesChannel.id],
    },
  });

  // Verify the link
  const updatedApiKey = await apiKeyModuleService.retrieveApiKey(newApiKey.id);
  logger.info(`API key title: ${updatedApiKey.title}`);
  logger.info(`API key type: ${updatedApiKey.type}`);
  logger.info(`API key ID: ${updatedApiKey.id}`);
  
  if (updatedApiKey.sales_channels && updatedApiKey.sales_channels.length > 0) {
    logger.info(`Linked to sales channels: ${updatedApiKey.sales_channels.map(sc => sc.name).join(', ')}`);
  } else {
    logger.warn("API key is not linked to any sales channels!");
  }

  logger.info("API key setup completed!");
  return updatedApiKey;
} 