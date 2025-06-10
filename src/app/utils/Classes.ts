export interface Classes {
  index: '';
  name: '';
  hit_die: 0;
  multi_classing: {
    prerequisites: [
      ability_score: {
        index: '';
        name: '';
        url: '';
      },
      minimum_score: 0
    ];
    profiencies: [
      {
        index: '';
        name: '';
        url: '';
      }
    ];
  };
  proficiencies: [
    {
      index: '';
      name: '';
      url: '';
    }
  ];
  proficiency_choices: [{}];
  saving_throws: [{ index: ''; name: ''; url: '' }];
  starting_equipment: [
    {
      equipment: {
        index: '';
        name: '';
        url: '';
      };
      quantity: 0;
    }
  ];
  starting_equipment_options: [
    {
      desc: '';
      choose: 1;
      type: 'equipment';
      from: {
        option_set_type: 'options_array';
        options: [{}];
      };
    }
  ];
  subclasses: [
    {
      index: '';
      name: '';
      url: '';
    }
  ];
}
