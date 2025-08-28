import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createApiKeysWorkflow } from "@medusajs/medusa/core-flows";

export default async function createApiKeyWithSalesChannel({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  logger.info("Creating API key with sales channel link...");

  // Get the sales channel
  const salesChannels = await salesChannelModuleService.listSalesChannels();
  const salesChannel = salesChannels.find(sc => sc.name === "Default Sales Channel");
  
  if (!salesChannel) {
    logger.error("Sales channel not found!");
    return;
  }

  logger.info(`Using sales channel: ${salesChannel.name} (${salesChannel.id})`);

  // Create API key with sales channel link
  try {
    const { result: apiKeyResult } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          {
            title: "Working Frontend Store",
            type: "publishable",
            created_by: "",
            sales_channels: [salesChannel.id], // Try to link directly
          },
        ],
      },
    });

    const newApiKey = apiKeyResult[0];
    logger.info(`Created new API key: ${newApiKey.id}`);
    logger.info(`Title: ${newApiKey.title}`);
    logger.info(`Type: ${newApiKey.type}`);

    // Check if it's linked
    if (newApiKey.sales_channels && newApiKey.sales_channels.length > 0) {
      logger.info(`Linked to sales channels: ${newApiKey.sales_channels.map(sc => sc.name).join(', ')}`);
    } else {
      logger.warn("API key is not linked to any sales channels!");
    }

    return newApiKey;
  } catch (error) {
    logger.error(`Error creating API key: ${error}`);
    return null;
  }
} 