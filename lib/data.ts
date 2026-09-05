import { getNavigationCategory, navigationCategories } from '@/lib/catalog/navigation'
import { productImage } from '@/lib/catalog/product-images'
import type { Priority, Product, StockMode } from '@/lib/catalog/types'

export type { Priority, Product, StockMode } from '@/lib/catalog/types'
export { navigationCategories } from '@/lib/catalog/navigation'

const source: Array<[string,string,string]> = [
['House Wiring & Cable','Wire','1.0 sqmm Single Core Copper Wire'],['House Wiring & Cable','Wire','1.5 sqmm Single Core Copper Wire'],['House Wiring & Cable','Wire','2.5 sqmm Single Core Copper Wire'],['House Wiring & Cable','Wire','4 sqmm Single Core Copper Wire'],['House Wiring & Cable','Wire','6 sqmm Single Core Copper Wire'],['House Wiring & Cable','Cable','2 Core Flexible Cable'],['House Wiring & Cable','Cable','3 Core Flexible Cable'],['House Wiring & Cable','Cable','CCTV RG59 Cable'],['House Wiring & Cable','Cable','Cat6 Cable'],['House Wiring & Cable','Cable','Speaker Cable'],['House Wiring & Cable','Accessories','Cable Lug'],['House Wiring & Cable','Accessories','Ferrule'],['House Wiring & Cable','Accessories','Cable Gland'],['House Wiring & Cable','Accessories','Cable Tie'],['House Wiring & Cable','Accessories','Cable Clip'],['House Wiring & Cable','Accessories','Heat Shrink Tube'],['House Wiring & Cable','Accessories','Insulation Tape'],['House Wiring & Cable','Accessories','Terminal Block'],['House Wiring & Cable','Accessories','Wire Connector'],
['Switch, Socket & Electrical Accessories','Switches','1 Gang Switch'],['Switch, Socket & Electrical Accessories','Switches','2 Gang Switch'],['Switch, Socket & Electrical Accessories','Switches','3 Gang Switch'],['Switch, Socket & Electrical Accessories','Switches','4 Gang Switch'],['Switch, Socket & Electrical Accessories','Switches','2 Way Switch'],['Switch, Socket & Electrical Accessories','Sockets','Universal Socket'],['Switch, Socket & Electrical Accessories','Sockets','2 Pin Socket'],['Switch, Socket & Electrical Accessories','Sockets','3 Pin Socket'],['Switch, Socket & Electrical Accessories','Sockets','13A Socket'],['Switch, Socket & Electrical Accessories','Accessories','16A Switch'],['Switch, Socket & Electrical Accessories','Accessories','Fan Regulator'],['Switch, Socket & Electrical Accessories','Accessories','Bell Push'],['Switch, Socket & Electrical Accessories','Accessories','Indicator Light'],['Switch, Socket & Electrical Accessories','Accessories','Ceiling Rose'],['Switch, Socket & Electrical Accessories','Accessories','Lamp Holder'],['Switch, Socket & Electrical Accessories','Accessories','Batten Holder'],['Switch, Socket & Electrical Accessories','Accessories','Modular Plate'],['Switch, Socket & Electrical Accessories','Accessories','Switch Box'],['Switch, Socket & Electrical Accessories','Accessories','Junction Box'],['Switch, Socket & Electrical Accessories','Accessories','Multi Plug / Power Strip'],
['MCB, RCCB & Protection','MCB','6A 1P'],['MCB, RCCB & Protection','MCB','10A 1P'],['MCB, RCCB & Protection','MCB','16A 1P'],['MCB, RCCB & Protection','MCB','20A 1P'],['MCB, RCCB & Protection','MCB','25A 1P'],['MCB, RCCB & Protection','MCB','32A 1P'],['MCB, RCCB & Protection','MCB','40A 1P'],['MCB, RCCB & Protection','MCB','63A 1P'],['MCB, RCCB & Protection','MCB','Common 2P MCB: 16A, 20A, 32A, 40A'],['MCB, RCCB & Protection','Other','RCCB'],['MCB, RCCB & Protection','Other','RCBO'],['MCB, RCCB & Protection','Other','Distribution Board'],['MCB, RCCB & Protection','Other','DIN Rail'],['MCB, RCCB & Protection','Other','Fuse Holder'],['MCB, RCCB & Protection','Other','Cartridge Fuse'],
['Fan & Fan Spare Parts','Fans','Ceiling Fan'],['Fan & Fan Spare Parts','Fans','Table Fan'],['Fan & Fan Spare Parts','Fans','Stand Fan'],['Fan & Fan Spare Parts','Fans','Exhaust Fan'],['Fan & Fan Spare Parts','Fans','Rechargeable Fan'],['Fan & Fan Spare Parts','Spare Parts','Fan Capacitor'],['Fan & Fan Spare Parts','Spare Parts','Fan Regulator'],['Fan & Fan Spare Parts','Spare Parts','Fan Remote'],['Fan & Fan Spare Parts','Spare Parts','Fan Receiver'],['Fan & Fan Spare Parts','Spare Parts','Fan Bearing'],['Fan & Fan Spare Parts','Spare Parts','Fan Hook'],['Fan & Fan Spare Parts','Spare Parts','Fan Down Rod'],['Fan & Fan Spare Parts','Spare Parts','Fan Canopy'],
['LED Lighting','Lighting','LED Bulb'],['LED Lighting','Lighting','LED Tube Light'],['LED Lighting','Lighting','LED Panel Light'],['LED Lighting','Lighting','LED Downlight'],['LED Lighting','Lighting','COB Light'],['LED Lighting','Lighting','LED Strip'],['LED Lighting','Accessories','LED Strip Connector'],['LED Lighting','Accessories','LED Driver'],['LED Lighting','Lighting','Emergency Light'],['LED Lighting','Lighting','Rechargeable Emergency Light'],['LED Lighting','Lighting','Sensor Light'],
['Plugs, Adapters & Power Supply','Plugs','2 Pin AC Plug'],['Plugs, Adapters & Power Supply','Plugs','3 Pin AC Plug'],['Plugs, Adapters & Power Supply','Plugs','Rewirable Plug'],['Plugs, Adapters & Power Supply','Plugs','DC Barrel Plug'],['Plugs, Adapters & Power Supply','Plugs','DC Barrel Jack'],['Plugs, Adapters & Power Supply','Adapters','5V Adapter'],['Plugs, Adapters & Power Supply','Adapters','9V Adapter'],['Plugs, Adapters & Power Supply','Adapters','12V Adapter'],['Plugs, Adapters & Power Supply','Adapters','24V Adapter'],['Plugs, Adapters & Power Supply','Adapters','CCTV Power Adapter'],['Plugs, Adapters & Power Supply','SMPS','5V SMPS'],['Plugs, Adapters & Power Supply','SMPS','12V SMPS'],['Plugs, Adapters & Power Supply','SMPS','24V SMPS'],
['Hand Tools','Tools','Combination Plier'],['Hand Tools','Tools','Long Nose Plier'],['Hand Tools','Tools','Side Cutting Plier'],['Hand Tools','Tools','Wire Stripper'],['Hand Tools','Tools','Cable Cutter'],['Hand Tools','Tools','Crimping Tool'],['Hand Tools','Tools','Screwdriver Set'],['Hand Tools','Tools','Insulated Screwdriver'],['Hand Tools','Tools','Test Pen'],['Hand Tools','Tools','Adjustable Wrench'],['Hand Tools','Tools','Allen Key Set'],['Hand Tools','Tools','Precision Screwdriver'],['Hand Tools','Tools','Cutter / Utility Knife'],['Hand Tools','Tools','Measuring Tape'],
['Multimeter & Test Equipment','Test Equipment','Digital Multimeter'],['Multimeter & Test Equipment','Test Equipment','Clamp Meter'],['Multimeter & Test Equipment','Test Equipment','Non-Contact Voltage Tester'],['Multimeter & Test Equipment','Test Equipment','USB Tester'],['Multimeter & Test Equipment','Test Equipment','Component Tester'],['Multimeter & Test Equipment','Accessories','Test Lead'],['Multimeter & Test Equipment','Accessories','Crocodile Clip'],['Multimeter & Test Equipment','Accessories','Replacement Meter Fuse'],
['Soldering & Repair','Repair','Soldering Iron'],['Soldering & Repair','Repair','Soldering Station'],['Soldering & Repair','Repair','Replacement Tip'],['Soldering & Repair','Consumables','Solder Wire'],['Soldering & Repair','Consumables','Flux'],['Soldering & Repair','Consumables','Solder Paste'],['Soldering & Repair','Repair','Solder Sucker'],['Soldering & Repair','Consumables','Desoldering Wick'],['Soldering & Repair','Repair','PCB Holder'],['Soldering & Repair','Repair','Helping Hands'],['Soldering & Repair','Consumables','Cleaning Brush'],['Soldering & Repair','Consumables','Kapton Tape'],['Soldering & Repair','Consumables','IPA / PCB Cleaner'],['Soldering & Repair','Consumables','Contact Cleaner'],
['Basic Electronic Components','Resistors','100Ω'],['Basic Electronic Components','Resistors','220Ω'],['Basic Electronic Components','Resistors','330Ω'],['Basic Electronic Components','Resistors','470Ω'],['Basic Electronic Components','Resistors','1KΩ'],['Basic Electronic Components','Resistors','2.2KΩ'],['Basic Electronic Components','Resistors','4.7KΩ'],['Basic Electronic Components','Resistors','10KΩ'],['Basic Electronic Components','Resistors','47KΩ'],['Basic Electronic Components','Resistors','100KΩ'],['Basic Electronic Components','Resistors','1MΩ'],['Basic Electronic Components','Capacitors','10μF'],['Basic Electronic Components','Capacitors','47μF'],['Basic Electronic Components','Capacitors','100μF'],['Basic Electronic Components','Capacitors','220μF'],['Basic Electronic Components','Capacitors','470μF'],['Basic Electronic Components','Capacitors','1000μF'],['Basic Electronic Components','Capacitors','2200μF'],['Basic Electronic Components','Capacitors','100nF Ceramic'],['Basic Electronic Components','Semiconductors','Rectifier Diode'],['Basic Electronic Components','Semiconductors','Zener Diode'],['Basic Electronic Components','Semiconductors','LED'],['Basic Electronic Components','Semiconductors','Transistor'],['Basic Electronic Components','Semiconductors','MOSFET'],['Basic Electronic Components','Semiconductors','Bridge Rectifier'],['Basic Electronic Components','Semiconductors','Voltage Regulator'],['Basic Electronic Components','Semiconductors','Op-Amp IC'],['Basic Electronic Components','Semiconductors','Timer IC'],['Basic Electronic Components','Other','Potentiometer'],['Basic Electronic Components','Other','LDR'],['Basic Electronic Components','Other','Thermistor'],['Basic Electronic Components','Other','Buzzer'],['Basic Electronic Components','Other','Fuse'],
['Relay, Switch & Connector','Relay','5V Relay'],['Relay, Switch & Connector','Relay','12V Relay'],['Relay, Switch & Connector','Relay','24V Relay'],['Relay, Switch & Connector','Relay','Relay Socket'],['Relay, Switch & Connector','Switch','Toggle Switch'],['Relay, Switch & Connector','Switch','Rocker Switch'],['Relay, Switch & Connector','Switch','Push Button'],['Relay, Switch & Connector','Switch','Micro Switch'],['Relay, Switch & Connector','Connector','JST Connector'],['Relay, Switch & Connector','Connector','Dupont Connector'],['Relay, Switch & Connector','Connector','DC Barrel Connector'],['Relay, Switch & Connector','Connector','KF301 Terminal'],['Relay, Switch & Connector','Connector','Screw Terminal'],['Relay, Switch & Connector','Connector','XT30'],['Relay, Switch & Connector','Connector','XT60'],['Relay, Switch & Connector','Connector','Pin Header'],['Relay, Switch & Connector','Connector','Female Header'],
['DC-DC Converter Modules','Modules','LM2596 Adjustable Buck Converter'],['DC-DC Converter Modules','Modules','XL4015 Buck Converter'],['DC-DC Converter Modules','Modules','XL6009 Boost Converter'],['DC-DC Converter Modules','Modules','MT3608 Boost Converter'],['DC-DC Converter Modules','Modules','Buck-Boost Converter'],['DC-DC Converter Modules','Modules','5V Regulator Module'],['DC-DC Converter Modules','Modules','12V Regulator Module'],['DC-DC Converter Modules','Meters','DC Voltage Meter Module'],['DC-DC Converter Modules','Meters','DC Current/Voltage Meter'],['DC-DC Converter Modules','Modules','USB-C PD Trigger Module'],['DC-DC Converter Modules','Modules','QC Trigger Module'],
['Battery, Charging & BMS','Charging','TP4056 Charging Module'],['Battery, Charging & BMS','Charging','TP4056 Protection Module'],['Battery, Charging & BMS','BMS','1S BMS'],['Battery, Charging & BMS','BMS','2S BMS'],['Battery, Charging & BMS','BMS','3S BMS'],['Battery, Charging & BMS','BMS','4S BMS'],['Battery, Charging & BMS','Hardware','18650 Battery Holder'],['Battery, Charging & BMS','Hardware','Li-ion Battery Holder'],['Battery, Charging & BMS','Hardware','Battery Connector'],['Battery, Charging & BMS','Hardware','Nickel Strip'],['Battery, Charging & BMS','BMS','Battery Protection Board'],['Battery, Charging & BMS','Charging','USB Battery Charger Module'],
['Arduino / ESP / DIY','Development Boards','Arduino UNO'],['Arduino / ESP / DIY','Development Boards','Arduino Nano'],['Arduino / ESP / DIY','Development Boards','ESP32'],['Arduino / ESP / DIY','Development Boards','ESP8266'],['Arduino / ESP / DIY','Development Boards','Raspberry Pi Pico'],['Arduino / ESP / DIY','Sensors','HC-SR04'],['Arduino / ESP / DIY','Sensors','PIR Sensor'],['Arduino / ESP / DIY','Sensors','LDR Module'],['Arduino / ESP / DIY','Sensors','DHT11'],['Arduino / ESP / DIY','Sensors','DHT22'],['Arduino / ESP / DIY','Sensors','MQ-2'],['Arduino / ESP / DIY','Modules','HC-05 Bluetooth'],['Arduino / ESP / DIY','Modules','RC522 RFID'],['Arduino / ESP / DIY','Modules','OLED Display'],['Arduino / ESP / DIY','Modules','LCD 16×2'],['Arduino / ESP / DIY','Modules','RTC Module'],['Arduino / ESP / DIY','Modules','SD Card Module'],['Arduino / ESP / DIY','Modules','1-Channel Relay Module'],['Arduino / ESP / DIY','Modules','4-Channel Relay Module'],
['Breadboard & Prototyping','Prototyping','830 Point Breadboard'],['Breadboard & Prototyping','Prototyping','Mini Breadboard'],['Breadboard & Prototyping','Jumper Wires','Male-Male Jumper Wire'],['Breadboard & Prototyping','Jumper Wires','Male-Female Jumper Wire'],['Breadboard & Prototyping','Jumper Wires','Female-Female Jumper Wire'],['Breadboard & Prototyping','Jumper Wires','Dupont Wire'],['Breadboard & Prototyping','Headers','Pin Header'],['Breadboard & Prototyping','Headers','Female Header'],['Breadboard & Prototyping','Prototyping','Perfboard'],['Breadboard & Prototyping','Prototyping','Prototype PCB'],['Breadboard & Prototyping','Consumables','Heat Shrink Tube'],
['Enclosure & Small Hardware','Enclosures','ABS Project Box'],['Enclosure & Small Hardware','Enclosures','Plastic Project Box'],['Enclosure & Small Hardware','Enclosures','Waterproof Enclosure'],['Enclosure & Small Hardware','Enclosures','Junction Box'],['Enclosure & Small Hardware','Enclosures','DIN Enclosure'],['Enclosure & Small Hardware','Hardware','Cable Gland'],['Enclosure & Small Hardware','Hardware','M2 Screw'],['Enclosure & Small Hardware','Hardware','M3 Screw'],['Enclosure & Small Hardware','Hardware','M4 Screw'],['Enclosure & Small Hardware','Hardware','Nut'],['Enclosure & Small Hardware','Hardware','Washer'],['Enclosure & Small Hardware','Hardware','PCB Standoff'],['Enclosure & Small Hardware','Hardware','Knob'],['Enclosure & Small Hardware','Hardware','Rubber Foot'],
['CCTV & Low-Voltage Accessories','CCTV','CCTV 12V Adapter'],['CCTV & Low-Voltage Accessories','CCTV','CCTV SMPS'],['CCTV & Low-Voltage Accessories','CCTV','DC Power Plug'],['CCTV & Low-Voltage Accessories','CCTV','DC Power Jack'],['CCTV & Low-Voltage Accessories','CCTV','BNC Connector'],['CCTV & Low-Voltage Accessories','Networking','Cat6 Cable'],['CCTV & Low-Voltage Accessories','Networking','RJ45 Connector'],['CCTV & Low-Voltage Accessories','Networking','RJ45 Crimping Tool'],['CCTV & Low-Voltage Accessories','Networking','LAN Tester'],['CCTV & Low-Voltage Accessories','CCTV','DC Power Splitter'],['CCTV & Low-Voltage Accessories','CCTV','DC Power Pigtail'],
['Smart Home & Automation','Smart Home','Wi-Fi Relay'],['Smart Home & Automation','Smart Home','Smart Switch'],['Smart Home & Automation','Smart Home','Smart Plug'],['Smart Home & Automation','Smart Home','Smart Bulb'],['Smart Home & Automation','Sensors','PIR Sensor'],['Smart Home & Automation','Sensors','Door Sensor'],['Smart Home & Automation','Automation','Digital Timer'],['Smart Home & Automation','Automation','Digital Thermostat'],['Smart Home & Automation','Automation','Temperature Controller'],['Smart Home & Automation','Automation','Energy Meter'],
['Electrical Consumables','Consumables','Insulation Tape'],['Electrical Consumables','Consumables','Heat Shrink Tube'],['Electrical Consumables','Consumables','Cable Tie'],['Electrical Consumables','Consumables','Cable Clip'],['Electrical Consumables','Consumables','Cable Lug'],['Electrical Consumables','Consumables','Ferrule'],['Electrical Consumables','Consumables','Terminal Block'],['Electrical Consumables','Consumables','Wire Connector'],['Electrical Consumables','Consumables','Cable Gland'],['Electrical Consumables','Consumables','Cable Marker'],['Electrical Consumables','Hardware','Wall Plug'],['Electrical Consumables','Hardware','Screw'],['Electrical Consumables','Consumables','Fuse'],['Electrical Consumables','Consumables','Fuse Holder'],['Electrical Consumables','Consumables','PTFE Tape']
]
const slugify=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
const high=/1\.5|2\.5|1\.0|switch|socket|plug|modular plate|fan regulator|fan capacitor|led bulb|led tube|mcb|cable lug|ferrule|cable tie|insulation tape|terminal block|connector/i
const medium=/fan|multimeter|plier|screwdriver|stripper|crimp|solder|flux|adapter|smps|relay|capacitor|diode|transistor|dc jack|lm2596|xl4015|xl6009|mt3608|tp4056|bms|battery holder/i
const low=/arduino|nano|esp32|esp8266|sensor|oled|lcd|hc-05|rc522|breadboard|jumper|project box|smart switch|smart plug|cctv|measurement/i
const inferAttributes=(category:string,subcategory:string,name:string)=>{
  const attributes:Record<string,string|number|boolean|string[]>={}
  const size=name.match(/(\d+(?:\.\d+)?)\s*sqmm/i);if(size)attributes.cable_size_mm2=Number(size[1])
  const cores=name.match(/(\d+)\s*Core/i);if(cores)attributes.cores=Number(cores[1])
  const amp=name.match(/(?:^|\s)(\d+)A(?:\s|$)/i);if(amp)attributes.amp_rating=Number(amp[1])
  const voltage=name.match(/(?:^|\s)(\d+(?:\.\d+)?)V(?:\s|$)/i);if(voltage)attributes.voltage=Number(voltage[1])
  const poles=name.match(/(?:^|\s)([1-4]P)(?:\s|$)/i);if(poles)attributes.poles=poles[1].toUpperCase()
  const gangs=name.match(/^(\d+)\s*Gang/i);if(gangs)attributes.gang=Number(gangs[1])
  const cells=name.match(/^(\d+)S\s+BMS/i);if(cells)attributes.cell_count=Number(cells[1])
  if(/copper/i.test(name))attributes.conductor='Copper'
  if(category==='House Wiring & Cable')attributes.cable_type=subcategory
  if(category==='Switch, Socket & Electrical Accessories')attributes.switch_type=subcategory
  if(category==='MCB, RCCB & Protection')attributes.protection_type=/RCBO/i.test(name)?'RCBO':/RCCB/i.test(name)?'RCCB':/MCB/i.test(name)?'MCB':/Fuse/i.test(name)?'Fuse':name
  if(category==='Hand Tools'||category==='Multimeter & Test Equipment')attributes.tool_type=subcategory
  if(category==='Multimeter & Test Equipment')attributes.measurement_type=/Clamp Meter/i.test(name)?'Clamp meter':/Multimeter/i.test(name)?'Multimeter':/Voltage Tester/i.test(name)?'Voltage testing':/USB Tester/i.test(name)?'USB testing':/Component Tester/i.test(name)?'Component testing':subcategory
  if(category==='Soldering & Repair'||category==='Basic Electronic Components'||category==='Relay, Switch & Connector')attributes.component_type=subcategory
  if(category==='Basic Electronic Components'&&(subcategory==='Resistors'||subcategory==='Capacitors'))attributes.component_value=name
  if(category==='Relay, Switch & Connector'&&subcategory==='Connector')attributes.connector_type=name
  if(category==='LED Lighting'||category==='Fan & Fan Spare Parts'||category==='Plugs, Adapters & Power Supply'||category==='Battery, Charging & BMS'||category==='DC-DC Converter Modules'||category==='Smart Home & Automation'||category==='Arduino / ESP / DIY'||category==='Breadboard & Prototyping')attributes.device_type=subcategory
  if(/Wi-Fi/i.test(name))attributes.protocol='Wi-Fi'
  if(/Bluetooth/i.test(name))attributes.protocol='Bluetooth'
  if(/RFID/i.test(name))attributes.protocol='RFID'
  if(category==='Enclosure & Small Hardware'||category==='CCTV & Low-Voltage Accessories'||category==='Electrical Consumables')attributes.required_group=category
  return attributes
}
// Keep the source order stable: IDs, SKUs and public slugs intentionally derive from it.
const allProducts: Product[] = source.map(([category, subcategory, name], index) => {
  const itemNumber = index + 1
  const slug = `${slugify(name)}-${itemNumber}`
  const stockMode: StockMode = high.test(name)
    ? 'high'
    : medium.test(name)
      ? 'medium'
      : low.test(name)
        ? 'low'
        : 'order'
  const priority: Priority = stockMode === 'high'
    ? 'P1'
    : stockMode === 'medium'
      ? 'P2'
      : stockMode === 'low'
        ? 'P3'
        : 'P4'

  return {
    id: `item-${String(itemNumber).padStart(3, '0')}`,
    sku: `VLT-${String(itemNumber).padStart(4, '0')}`,
    name,
    slug,
    category,
    subcategory,
    priority,
    stockMode,
    trending: index % 17 === 0,
    shortDescription: `${name} for ${subcategory.toLowerCase()} applications.`,
    description: `A catalogue item listed in the source under ${category}. Product specifications, pricing, brand, supplier and quantity are not provided in the source.`,
    brand: null,
    brandSuggestions: [],
    specifications: {},
    attributes: inferAttributes(category, subcategory, name),
    applications: [],
    images: {
      primary: productImage(category),
      gallery: [],
      imageSearchQuery: `${name} ${category}`,
    },
    pricing: { currency: 'BDT', cost: null, sellingPrice: null },
    availability: { inStock: null, quantity: null, unit: 'pcs' },
    supplier: { supplierId: null, supplierName: null },
    tags: [slugify(name), slugify(category)],
    status: 'active',
  }
})

// Launch policy: show half of every source category without removing any category.
const categoryPositions = new Map<string, number>()
export const products: Product[] = allProducts.filter((product) => {
  const position = categoryPositions.get(product.category) ?? 0
  categoryPositions.set(product.category, position + 1)
  return position % 2 === 0
})

export const categories = [...new Set(products.map((product) => product.category))].map((name) => ({
  name,
  slug: slugify(name),
  href: `/category/${slugify(name)}`,
  desc: `Products listed in the ${name} category.`,
}))
export type Category=typeof categories[number]
export const getProduct = (slugOrId: string) => allProducts.find((product) => (
  product.slug === slugOrId || product.id === slugOrId
))
export const getProductBySku = (sku: string) => allProducts.find((product) => product.sku === sku)
export const getCategory=getNavigationCategory

export const productsByNavigationCategory = (slug: string) => {
  const category = getCategory(slug)
  return category
    ? products.filter((product) => category.sourceCategories.includes(product.category as never))
    : []
}

export const searchProducts = (query: string) => {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery || normalizedQuery === 'all') return products
  if (normalizedQuery === 'best') return products.filter((product) => product.priority === 'P1')

  return products.filter((product) => (
    [product.name, product.sku, product.category, product.subcategory, ...product.tags]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery)
  ))
}

export const relatedProducts = (product: Product) => products
  .filter((candidate) => candidate.category === product.category && candidate.id !== product.id)
  .slice(0, 4)

export const priorityProducts = products.filter((product) => product.priority === 'P1')
export const trendingProducts = products.filter((product) => product.trending)

export const stockLabel = (mode: StockMode) => mode === 'order'
  ? 'Order on request'
  : 'Confirm availability'
