export interface Equipment {
  index: '';
  name: '';
  category_range: '';
  contents: [];
  cost: {
    quantity: 0;
    unit: '';
  };
  damage: {
    damage_dice: '';
    damage_type: {
      index: '';
      name: '';
      url: '';
    };
  };
  equipment_category: {
    index: '';
    name: '';
    url: '';
  };
  properties: [
    {
      index: '';
      name: '';
      url: '';
    }
  ];
  range: { normale: 0 };
  two_handed_damage?: {
    damage_dice: '';
    damage_type: {
      index: '';
      name: '';
      url: '';
    };
  };
  special?: [''];
}
