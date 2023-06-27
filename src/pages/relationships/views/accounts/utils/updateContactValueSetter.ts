import { Account, Contact } from "@/shared/models/models";
import { GridValueSetterParams } from "@mui/x-data-grid-pro";

export const updateContactValueSetter = ({
  row,
  value,
  type,
}: GridValueSetterParams<Account, string> & {
  type: "phone" | "whatsapp" | "email";
}): Account => {
  const contactEl = row?.contacts?.find(
    (contact) => contact.type === type && contact.is_primary
  );
  let contactsArray: Contact[] = [];
  const contacts =
    row?.contacts?.filter((contact) => contact.id !== contactEl?.id) || [];
  if (contactEl) {
    contactsArray = [
      ...contacts,
      {
        ...contactEl,
        contact_info: value,
      },
    ];
  } else {
    contactsArray = [
      ...contacts,
      {
        type,
        contact_info: value,
        id: null as unknown as number,
        is_primary: true,
      },
    ] as Contact[];
  }

  return { ...row, contacts: contactsArray, mobileNumber: value } as Account;
};
