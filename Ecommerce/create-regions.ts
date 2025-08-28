import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createRegionsWorkflow } from "@medusajs/medusa/core-flows";

export default async function createRegions({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const regionModuleService = container.resolve(Modules.REGION);

  logger.info("Creating regions...");

  // Check if regions already exist
  const existingRegions = await regionModuleService.listRegions();
  
  if (existingRegions.length > 0) {
    logger.info(`Found ${existingRegions.length} existing regions:`);
    for (const region of existingRegions) {
      logger.info(`- ${region.name} (${region.currency_code})`);
      if (region.countries) {
        logger.info(`  Countries: ${region.countries.map(c => c.iso_2).join(', ')}`);
      }
    }
    return existingRegions;
  }

  // Create regions
  const { result: regions } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "United States",
          currency_code: "usd",
          countries: ["us"],
        },
        {
          name: "United Kingdom",
          currency_code: "gbp",
          countries: ["gb"],
        },
        {
          name: "European Union",
          currency_code: "eur",
          countries: ["de", "fr", "it", "es"],
        },
      ],
    },
  });

  logger.info(`Created ${regions.length} regions:`);
  for (const region of regions) {
    logger.info(`- ${region.name} (${region.currency_code})`);
  }

  return regions;
} 