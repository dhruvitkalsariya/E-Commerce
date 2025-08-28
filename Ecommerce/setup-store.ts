import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { 
  createApiKeysWorkflow, 
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  updateStoresWorkflow
} from "@medusajs/medusa/core-flows";

export default async function setupStore({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const storeModuleService = container.resolve(Modules.STORE);
  const regionModuleService = container.resolve(Modules.REGION);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const apiKeyModuleService = container.resolve(Modules.API_KEY);

  logger.info("Setting up store...");

  // 1. Update store
  const [store] = await storeModuleService.listStores();
  await updateStoresWorkflow(container).run({
    input: {
      id: store.id,
      supported_currency_codes: ["usd", "eur", "gbp"],
    },
  });

  // 2. Create regions if they don't exist
  let regions = await regionModuleService.listRegions();
  if (regions.length === 0) {
    logger.info("Creating regions...");
    const { result: regionsResult } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "United States",
            currency_code: "usd",
            countries: ["us"],
          },
          {
            name: "Europe",
            currency_code: "eur",
            countries: ["de", "fr", "it", "es", "gb"],
          },
        ],
      },
    });
    regions = regionsResult;
  }

  // 3. Create sales channel if it doesn't exist
  let salesChannels = await salesChannelModuleService.listSalesChannels();
  if (salesChannels.length === 0) {
    logger.info("Creating sales channel...");
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(container).run({
      input: {
        salesChannelsData: [
          {
            name: "Default Sales Channel",
          },
        ],
      },
    });
    salesChannels = salesChannelResult;
  }

  // 4. Create API key if it doesn't exist
  let apiKeys = await apiKeyModuleService.listApiKeys();
  let publishableKey = apiKeys.find(key => key.type === "publishable");
  
  if (!publishableKey) {
    logger.info("Creating publishable API key...");
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
    publishableKey = apiKeyResult[0];
  }

  // 5. Link sales channel to API key
  logger.info("Linking sales channel to API key...");
  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableKey.id,
      add: [salesChannels[0].id],
    },
  });

  logger.info("Store setup completed!");
  logger.info(`Publishable API Key: ${publishableKey.id}`);
  logger.info(`Sales Channel: ${salesChannels[0].name}`);
  logger.info(`Regions: ${regions.map(r => r.name).join(', ')}`);

  return {
    publishableKey,
    salesChannels,
    regions,
  };
} 