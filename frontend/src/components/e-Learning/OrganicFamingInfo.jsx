import React from "react";
import FadeInSection from "../layout/FadeInSection";
import "./../css/information.css";

const OrganicFarmingInfo = () => {
  return (
    <div className="info-page">
        <FadeInSection>
        <section className="full-page-card">
          <h2>Benefits for the Environment</h2>
          <p>
            Choosing organic not only enhances your health but also safeguards the planet for future generations. Organic farming avoids synthetic chemicals, maintains ecological balance, fosters healthy soil, and reduces the overall environmental footprint of agriculture. This holistic approach ensures cleaner water sources, healthier wildlife habitats, and long-term sustainability.
          </p>

          <ul>

            <li>
              <strong>Enhances Soil Fertility:</strong>
              <p>Organic practices promote soil health by fostering beneficial microorganisms, improving soil structure, and increasing water retention capacity.</p>
            </li>
            <li>
              <strong>Reduces Water Pollution:</strong>
              <p>Avoiding synthetic pesticides and fertilizers prevents harmful chemicals from contaminating water sources and harming aquatic ecosystems.</p>
            </li>
            <li>
              <strong>Protects Biodiversity:</strong>
              <p>Organic farming supports diverse ecosystems by avoiding monoculture, preserving natural habitats, and promoting wildlife-friendly practices.</p>
            </li>
            <li>
              <strong>Reduces Carbon Footprint:</strong>
              <p>Organic agriculture releases fewer greenhouse gases, sequesters carbon in the soil, and helps mitigate climate change.</p>
            </li>
          </ul>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="full-page-card">
          <h2>Benefits for Farmers</h2>
          <p>
            Organic farming empowers farmers by promoting healthier working environments, reducing costs, and enabling premium product pricing. These advantages contribute to the sustainability and profitability of farming operations.
          </p>
          
          <ul>
            <li>
              <strong>Healthier Working Conditions:</strong> 
              <p>Avoidance of toxic chemicals leads to a safer and more pleasant working environment, reducing health risks for farmers and farm workers.</p>
            </li>
            <li>
              <strong>Higher Income Potential:</strong> 
              <p>Organic produce often commands premium prices in the market, increasing farmers income and financial stability.</p>
            </li>
            <li>
              <strong>Long-Term Soil Health:</strong> 
              <p>Maintaining soil fertility through organic practices ensures productive land for future generations, securing the longevity of farming operations.</p>
            </li>
            <li>
              <strong>Access to Niche Markets:</strong> 
              <p>Organic certification opens doors to specialized markets and consumers who prioritize sustainable and ethical products.</p>
            </li>
          </ul>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="full-page-card">
          <h2>Benefits for Consumers</h2>
          <p>
            Consumers enjoy a range of advantages when choosing organic products, from better health to supporting sustainable practices that protect the environment.
          </p>
          
          <ul>
            <li>
              <strong>Healthier, Chemical-Free Food:</strong> 
              <p>Organic produce is grown without synthetic pesticides and fertilizers, reducing your exposure to harmful chemicals.</p>
            </li>
            <li>
              <strong>Higher Nutrient Content:</strong> 
              <p>Studies suggest that organic foods may contain higher levels of certain nutrients compared to conventionally grown counterparts.</p>
            </li>
            <li>
              <strong>Supports Ethical Practices:</strong> 
              <p>Choosing organic supports farmers who prioritize sustainable and humane farming methods.</p>
            </li>
            <li>
              <strong>Environmental Stewardship:</strong> 
              <p>Your purchase helps promote farming practices that protect natural resources and biodiversity.</p>
            </li>
            <li>
              <strong>Better Taste and Freshness:</strong> 
              <p>Organic produce is often harvested at peak ripeness, ensuring superior flavor and freshness.</p>
            </li>
          </ul>

        </section>
      </FadeInSection>
    </div>
  );
};

export default OrganicFarmingInfo;
