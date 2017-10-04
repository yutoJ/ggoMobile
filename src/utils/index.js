import { HOST } from '../constants';

export function normalizeGadgets(gadgets) {
  return gadgets.map(gadget => {
    return {
      id: gadget.id || '',
      title: gadget.listing_name || '',
      image: gadget.image.url || '',
      gadgetType: gadget.gadget_type || '',
      price: gadget.price || '',
      instant: gadget.instant || '',
    }
  })
}
