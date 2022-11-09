import dayjs from 'dayjs'

export const UTILS = {
  formatDistance(num, digits) {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'K' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    var item = lookup
      .slice()
      .reverse()
      .find((item) => {
        return num >= item.value
      })
    return item
      ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
      : '0'
  },

  formatTitle(value) {
    return value?.replace(/[\. ,:-]+/g, '-').toLowerCase()
  },

  formatDate(date) {
    return dayjs(date).format('DD-MMM-YYYY')
  },

  calculateStarValue(value = []) {
    let starValue = 0
    for (const index of value) {
      starValue += Number(index.rating)
    }
    return value.length ? starValue / value.length : 0
  },

  isValidEmail(email) {
    var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return EMAIL_REGEXP.test(email)
  },

  isValidPhone(value) {
    var PHONE_REGEXP = /^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/
    return PHONE_REGEXP.test(value)
  },

  yearDropdownValues() {
    const max = new Date().getFullYear(),
      min = max - 20,
      arr = []

    for (var i = min; i <= max; i++) {
      arr.push(i)
    }
    return arr.reverse()
  },

  colorDropDownValues() {
    return [
      'Beige',
      'Black',
      'Blue',
      'Brown',
      'Burgundy',
      'Chrome',
      'Gold',
      'Green',
      'Grey',
      'Orange',
      'Pink',
      'Purple',
      'Red',
      'Silver',
      'Tan',
      'Teal',
      'White',
      'Yellow',
      'Other',
    ].sort()
  },

  yesNoDropdownValues() {
    return ['Yes', 'No']
  },

  numberUpto10DropdownValues() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  numberOfDoorDropdownValues() {
    return [1, 2, 3, 4, 5]
  },
  numberUpto20DropdownValues() {
    return [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
    ]
  },
  numberOfCylinderDropdownValues() {
    
    return [3, 4, 5, 6, 8, 10, 12, 16]
  },

  transmissionTypes() {
    return ['Automatic', 'Manual']
  },

  fuelTypes() {
    return ['Gasoline', 'Diesel', 'Hybrid', 'Electric'].sort()
  },

  sellerTypes() {
    return ['Owner', 'Dealer'].sort()
  },

  bodyType() {
    return [
      'Coupe',
      'Crossover',
      'Hard Top Convertible',
      'Hatchback',
      'Pick Up Truck',
      'Sedan',
      'Soft Top Convertible',
      'Sports Car',
      'SUV',
      'Utility Truck',
      'Van',
      'Wagon',
      'Other',
    ].sort()
  },

  horsePowerOptions() {
    return [
      'Less Than 150 HP',
      '150 - 200 HP',
      '300 - 400 HP',
      '400 - 500 HP',
      '500 - 600 HP',
      '600 - 700 HP',
      '700 - 800 HP',
      '800 - 900 HP',
      '900 - 1000 HP',
      '1000 + HP',
    ]
  },

  steeringSideOptions() {
    return ['Left Hand Drive', 'Right Hand Drive']
  },
  insuranceList() {
    return ['Basic', 'Advanced']
  },
  additionalDriverInsuranceOptions() {
    return ['Yes', 'No']
  },
  bodyConditionDropDownValues() {
    return [
      'Perfect Inside and Out',
      'No Accidents, very few faults',
      'A bit of wear & tear, all repaired',
      'Normal wear & tear, a few issues',
      'Lots of wear & tear to the body',
      'Totalled',
    ]
  },
  mechanicalConditionDropDownValues() {
    return [
      'Perfect Inside and Out',
      'Minor faults, all fixed',
      'Major faults, all fixed',
      'Major faults fixed, small remain',
      'Ongoing minor & major faults',
    ]
  },
  regionalspecsDropDownValues() {
    return [
      'GCC',
      'North American Spec',
      'European Spec',
      'Japanese Spec',
      'Other',
    ]
  },
  subcategoryDropDownValues() {
    return ['Motorboats', 'Sailboats', 'Row/Paddleboats']
  },
  ageDropDownValues() {
    return [
      'Brand New',
      '0 - 1 months',
      '1 - 6 months',
      '6 - 12 months',
      '1 - 2 years',
      '2 - 5 years',
      '5 - 10 years',
      '10+ years',
    ]
  },
  boatConditionDropdownValues() {
    return ['Flawless', 'Excellent', 'Good', 'Average', 'Poor']
  },
  boatHistoryDropdownValues() {
    return [
      'Never Used',
      'Used Once',
      'Light Usage',
      'Normal Usage',
      'Heavy Usage',
    ]
  },
  lengthDropdownValues() {
    return [
      'Under 10 ft.',
      '10-14 ft.',
      '15-19 ft.',
      '20-24 ft.',
      '25-29 ft.',
      '30-39 ft.',
      '40-49 ft.',
      '50-69 ft.',
      '70-100 ft.',
      '100+ ft.',
    ]
  },
  motorcycleSubcateList() {
    return [
      'Sports Bike',
      'Adventure/ Touring',
      'Cruiser/Chopper',
      'Off- Road',
      'Scooter',
      'Standard/Commuter',
      'Café - Racer',
      'Trike',
      'Trailer',
      'Carting',
      'Mo-Ped',
      'Other',
    ]
  },
  motorCyclefDSystemList() {
    return ['Belt', 'Chain', 'Shaft', 'Other']
  },
  wheelsDropdownValues() {
    return ['2 Wheel', '3 Wheel', '4 Wheel']
  },
  motorCycleEngineSizeList() {
    return [
      'Less than 250CC',
      '250CC - 499 CC',
      '500 - 599CC',
      '600-649CC',
      '750-999CC',
      '1000CC or More',
    ]
  },
  motorCycleSubSpecList() {
    return ['Brand', 'Model', 'Year to year', 'Km to km']
  },
  motorCycleRegionalSpecList() {
    return ['GCC', 'Non-GCC']
  },
  PriceToPriceList() {
    return ['Min', 'Max']
  },
  truckSubCategoryList() {
    return ['Trucks', 'Buses', 'Fork Lifts', 'Trailer', 'Cranes', 'Tankers', 'Other']
  },
  truckHorsPowrList() {
    return ['Less than 150 HP', '150 - 200 HP', '200 - 300 HP', '300 - 400 HP', '400+ HP']
  },  
  truckKmList() {
    return ['Min', 'Max']
  },
  numPlatesEmirateList() {
    return ['Abu Dhabi', 'Ajman', 'Dubai', 'Fujairah', 'Ras Al Khaimah', 'Sharjah', 'Umm Al Quwain']
  },
  numPlatesSubCatList() {
    return ['Private', 'Classic', 'Motorcycle']
  },
  numPlatesDigitsList() {
    return ['1', '2', '3', '4', '5']
  },
  
 }
