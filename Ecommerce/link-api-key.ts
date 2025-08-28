import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { linkSalesChannelsToApiKeyWorkflow } from "@medusajs/medusa/core-flows";

export default async function linkApiKey({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const apiKeyModuleService = container.resolve(Modules.API_KEY);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  logger.info("Linking API key to sales channel...");

  // Get the API key
  const apiKeys = await apiKeyModuleService.listApiKeys();
  const apiKey = apiKeys.find(key => key.title === "Frontend Store");
  
  if (!apiKey) {
    logger.error("API key 'Frontend Store' not found!");
    return;
  }

  // Get the sales channel
  const salesChannels = await salesChannelModuleService.listSalesChannels();
  const salesChannel = salesChannels.find(sc => sc.name === "Default Sales Channel");
  
  if (!salesChannel) {
    logger.error("Sales channel 'Default Sales Channel' not found!");
    return;
  }

  logger.info(`Linking API key ${apiKey.id} to sales channel ${salesChannel.id}...`);

  // Link the sales channel to the API key
  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: apiKey.id,
      add: [salesChannel.id],
    },
  });

  logger.info("API key successfully linked to sales channel!");

  // Verify the link
  const updatedApiKey = await apiKeyModuleService.retrieveApiKey(apiKey.id);
  if (updatedApiKey.sales_channels && updatedApiKey.sales_channels.length > 0) {
    logger.info(`API key is now linked to: ${updatedApiKey.sales_channels.map(sc => sc.name).join(', ')}`);
  } else {
    logger.error("API key is still not linked to any sales channels!");
  }

  return updatedApiKey;
} 