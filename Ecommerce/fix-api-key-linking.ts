import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function fixApiKeyLinking({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const apiKeyModuleService = container.resolve(Modules.API_KEY);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  logger.info("Fixing API key linking...");

  // Get the API key
  const apiKeys = await apiKeyModuleService.listApiKeys();
  const apiKey = apiKeys.find(key => key.id === "apk_01K3NPGVD8BB1WSA8FPSAE91NE");
  
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

  // Try to link using the sales channel service
  try {
    const updatedSalesChannel = await salesChannelModuleService.updateSalesChannel(salesChannel.id, {
      api_keys: [apiKey.id],
    });
    
    logger.info("Sales channel updated successfully!");
    logger.info(`Updated sales channel: ${updatedSalesChannel.id}`);
    
    if (updatedSalesChannel.api_keys && updatedSalesChannel.api_keys.length > 0) {
      logger.info(`Linked to API keys: ${updatedSalesChannel.api_keys.map(ak => ak.title).join(', ')}`);
    } else {
      logger.warn("Sales channel is still not linked to any API keys!");
    }
    
    return updatedSalesChannel;
  } catch (error) {
    logger.error(`Error updating sales channel: ${error}`);
    return null;
  }
} 