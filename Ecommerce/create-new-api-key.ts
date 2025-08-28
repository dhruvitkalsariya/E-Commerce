import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createApiKeysWorkflow, linkSalesChannelsToApiKeyWorkflow } from "@medusajs/medusa/core-flows";

export default async function createNewApiKey({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  logger.info("Creating new API key...");

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
          title: "New Frontend Store",
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

  logger.info("API key setup completed!");
  logger.info(`New API Key ID: ${newApiKey.id}`);
  logger.info(`Sales Channel: ${salesChannel.name}`);
  
  return newApiKey;
} 