import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function verifyApiKey({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const apiKeyModuleService = container.resolve(Modules.API_KEY);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const regionModuleService = container.resolve(Modules.REGION);

  logger.info("Verifying API key setup...");

  // Check API keys
  const apiKeys = await apiKeyModuleService.listApiKeys();
  logger.info(`Found ${apiKeys.length} API keys:`);
  
  for (const apiKey of apiKeys) {
    logger.info(`- ID: ${apiKey.id}`);
    logger.info(`  Title: ${apiKey.title}`);
    logger.info(`  Type: ${apiKey.type}`);
    logger.info(`  Created: ${apiKey.created_at}`);
    logger.info(`  Updated: ${apiKey.updated_at}`);
    
    if (apiKey.sales_channels && apiKey.sales_channels.length > 0) {
      logger.info(`  Linked to sales channels: ${apiKey.sales_channels.map(sc => sc.name).join(', ')}`);
    } else {
      logger.info(`  Not linked to any sales channels`);
    }
    logger.info("");
  }

  // Check sales channels
  const salesChannels = await salesChannelModuleService.listSalesChannels();
  logger.info(`Found ${salesChannels.length} sales channels:`);
  
  for (const sc of salesChannels) {
    logger.info(`- ID: ${sc.id}`);
    logger.info(`  Name: ${sc.name}`);
    logger.info(`  Created: ${sc.created_at}`);
    logger.info("");
  }

  // Check regions
  const regions = await regionModuleService.listRegions();
  logger.info(`Found ${regions.length} regions:`);
  
  for (const region of regions) {
    logger.info(`- ID: ${region.id}`);
    logger.info(`  Name: ${region.name}`);
    logger.info(`  Currency: ${region.currency_code}`);
    if (region.countries) {
      logger.info(`  Countries: ${region.countries.map(c => c.iso_2).join(', ')}`);
    }
    logger.info("");
  }

  // Test the specific API key
  const testKey = "apk_01K3NPCM4HPERHRXFH2T06GG41";
  const foundKey = apiKeys.find(key => key.id === testKey);
  
  if (foundKey) {
    logger.info(`Test key ${testKey} found:`);
    logger.info(`  Title: ${foundKey.title}`);
    logger.info(`  Type: ${foundKey.type}`);
    if (foundKey.sales_channels && foundKey.sales_channels.length > 0) {
      logger.info(`  Linked to: ${foundKey.sales_channels.map(sc => sc.name).join(', ')}`);
    } else {
      logger.error(`  NOT LINKED TO ANY SALES CHANNELS!`);
    }
  } else {
    logger.error(`Test key ${testKey} not found!`);
  }

  return { apiKeys, salesChannels, regions };
} 