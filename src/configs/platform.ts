export const PlatformConfigs = {
  name: "Wealthfront",
  currency: "COP",
  plans: {
    Free: {
      name: "Business Free",
      costs: {
        monthly_price: 0.0,
        annual_price: 0.0,
        fixed_commission: 990,
        variable_commission: 2.99
      }
    },
    Basic: {
      name: "Business Basic",
      costs: {
        monthly_price: 16900,
        annual_price: 182520,
        fixed_commission: 960,
        variable_commission: 2.99
      }
    },
    Standard: {
      name: "Business Standard",
      costs: {
        monthly_price: 36900,
        annual_price: 398520,
        fixed_commission: 920,
        variable_commission: 2.99
      }
    },
    Advanced: {
      name: "Business Advanced",
      costs: {
        monthly_price: 66900,
        annual_price: 722520,
        fixed_commission: 870,
        variable_commission: 2.99
      }
    },
    Pro: {
      name: "Business Pro",
      costs: {
        monthly_price: 126900,
        annual_price: 1370520,
        fixed_commission: 810,
        variable_commission: 2.99
      }
    }
  }
};
