import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function manualLinkApiKey({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const apiKeyModuleService = container.resolve(Modules.API_KEY);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  logger.info("Manually linking API key to sales channel...");

  // Get the API key
  const apiKeys = await apiKeyModuleService.listApiKeys();
  const apiKey = apiKeys.find(key => key.id === "apk_01K3NPCM4HPERHRXFH2T06GG41");
  
  if (!apiKey) {
    logger.error("API key not found!");
    return;
  }

  // Get the sales channel
  const salesChannels = await salesChannelModuleService.listSalesChannels();
  const salesChannel = salesChannels.find(sc => sc.name === "Default Sales Channel");
  
  if (!salesChannel) {
    logger.error("Sales channel not found!");
    return;
  }

  logger.info(`API Key: ${apiKey.id} (${apiKey.title})`);
  logger.info(`Sales Channel: ${salesChannel.id} (${salesChannel.name})`);

  // Try to update the API key directly
  try {
    const updatedApiKey = await apiKeyModuleService.updateApiKey(apiKey.id, {
      sales_channels: [salesChannel.id],
    });
    
    logger.info("API key updated successfully!");
    logger.info(`Updated API key: ${updatedApiKey.id}`);
    
    if (updatedApiKey.sales_channels && updatedApiKey.sales_channels.length > 0) {
      logger.info(`Linked to sales channels: ${updatedApiKey.sales_channels.map(sc => sc.name).join(', ')}`);
    } else {
      logger.warn("API key is still not linked to any sales channels!");
    }
    
    return updatedApiKey;
  } catch (error) {
    logger.error(`Error updating API key: ${error}`);
    return null;
  }
} 