import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function checkApiKeys({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const apiKeyModuleService = container.resolve(Modules.API_KEY);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  logger.info("Checking existing API keys...");

  // List all API keys
  const apiKeys = await apiKeyModuleService.listApiKeys();
  
  logger.info(`Found ${apiKeys.length} API keys:`);
  
  for (const apiKey of apiKeys) {
    logger.info(`- ID: ${apiKey.id}`);
    logger.info(`  Title: ${apiKey.title}`);
    logger.info(`  Type: ${apiKey.type}`);
    logger.info(`  Created: ${apiKey.created_at}`);
    logger.info(`  Updated: ${apiKey.updated_at}`);
    
    // Check if it's linked to any sales channels
    if (apiKey.sales_channels && apiKey.sales_channels.length > 0) {
      logger.info(`  Linked to sales channels: ${apiKey.sales_channels.map(sc => sc.name).join(', ')}`);
    } else {
      logger.info(`  Not linked to any sales channels`);
    }
    logger.info("");
  }

  // List all sales channels
  const salesChannels = await salesChannelModuleService.listSalesChannels();
  logger.info(`Found ${salesChannels.length} sales channels:`);
  
  for (const sc of salesChannels) {
    logger.info(`- ID: ${sc.id}`);
    logger.info(`  Name: ${sc.name}`);
    logger.info(`  Created: ${sc.created_at}`);
    logger.info("");
  }

  return { apiKeys, salesChannels };
} 