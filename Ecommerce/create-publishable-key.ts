import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createApiKeysWorkflow, linkSalesChannelsToApiKeyWorkflow } from "@medusajs/medusa/core-flows";

export default async function createPublishableKey({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  logger.info("Creating publishable API key...");

  // Get the default sales channel
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    logger.info("No default sales channel found. Creating one...");
    // Create a default sales channel if it doesn't exist
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(
      container
    ).run({
      input: {
        salesChannelsData: [
          {
            name: "Default Sales Channel",
          },
        ],
      },
    });
    defaultSalesChannel = salesChannelResult;
  }

  // Create the publishable API key
  const { result: publishableApiKeyResult } = await createApiKeysWorkflow(
    container
  ).run({
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

  const publishableApiKey = publishableApiKeyResult[0];

  // Link the sales channel to the API key
  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel[0].id],
    },
  });

  logger.info(`Publishable API key created successfully!`);
  logger.info(`Key: ${publishableApiKey.id}`);
  logger.info(`Title: ${publishableApiKey.title}`);
  logger.info(`Type: ${publishableApiKey.type}`);

  return publishableApiKey;
} 