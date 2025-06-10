export interface Spells {
  index: '';
  name: '';
  attack_type: '';
  casting_time: '';
  classes: [
    {
      index: '';
      classes: [
        {
          index: '';
          name: 'Cleric';
          url: '/api/2014/classes/cleric';
        }
      ];
    }
  ];
  components: [];
  concentration: false;
  damage: {};
  desc: '';
  duration: '';
  higher_level: [];
  level: 0;
  material: '';
  range: '';
  ritual: false;
  school: {};
  subclasses: [];
}
