import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createApiKeysWorkflow } from "@medusajs/medusa/core-flows";

export default async function createWorkingApiKey({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  logger.info("Creating working API key...");

  // Get the sales channel
  const salesChannels = await salesChannelModuleService.listSalesChannels();
  const salesChannel = salesChannels.find(sc => sc.name === "Default Sales Channel");
  
  if (!salesChannel) {
    logger.error("Sales channel not found!");
    return;
  }

  logger.info(`Using sales channel: ${salesChannel.name} (${salesChannel.id})`);

  // Create API key with a simple approach
  try {
    const { result: apiKeyResult } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          {
            title: "Working Store Key",
            type: "publishable",
            created_by: "",
          },
        ],
      },
    });

    const newApiKey = apiKeyResult[0];
    logger.info(`Created new API key: ${newApiKey.id}`);
    logger.info(`Title: ${newApiKey.title}`);
    logger.info(`Type: ${newApiKey.type}`);

    // Now try to link it manually using a different approach
    logger.info("Attempting to link API key to sales channel...");
    
    // Try to update the sales channel with the API key
    try {
      const updatedSalesChannel = await salesChannelModuleService.updateSalesChannel(salesChannel.id, {
        api_keys: [newApiKey.id],
      });
      
      logger.info("Sales channel updated with API key!");
      logger.info(`Updated sales channel: ${updatedSalesChannel.id}`);
      
      if (updatedSalesChannel.api_keys && updatedSalesChannel.api_keys.length > 0) {
        logger.info(`Linked to API keys: ${updatedSalesChannel.api_keys.map(ak => ak.title).join(', ')}`);
      }
      
    } catch (linkError) {
      logger.warn(`Could not link API key automatically: ${linkError}`);
      logger.info("You may need to link it manually through the admin panel");
    }

    logger.info("API key creation completed!");
    logger.info(`New API Key ID: ${newApiKey.id}`);
    logger.info(`Sales Channel: ${salesChannel.name}`);
    
    return newApiKey;
  } catch (error) {
    logger.error(`Error creating API key: ${error}`);
    return null;
  }
} 