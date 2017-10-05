import { HOST } from '../constants';
import { MOCK_AVATAR } from '../constants/secret';
//TODO

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

export function normalizeGadget(gadget) {

  return {
    id: gadget.id || '',
    title: gadget.listing_name || '',
    image: gadget.image.url || '',
    description: gadget.description || '',
    gadgetType: gadget.gadget_type || '',
    price: gadget.price || '',
    hasGuarantee: gadget.has_guarantee || '',
    hasManual: gadget.has_manual || '',
    hasContent: gadget.has_content || '',
    hasNoSetup: gadget.has_no_setup || '',
    hasBattery: gadget.has_battery || '',
    requireMobile: gadget.require_mobile || '',
    requireAccount: gadget.require_account || '',
    unavailableDates: gadget.unavailable_dates || '',
    owner: gadget.owner ? {
      name: gadget.owner.name || '',
      email: gadget.owner.email || '',
      image: gadget.owner.local_image.url || MOCK_AVATAR,
    } : {
      email: '',
      name: '',
      image: '',
    }
  }
}
