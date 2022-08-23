export const IS_EMPTY_STRING = (value: string) => {
  return !value?.length;
};

export const IS_EMAIL = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const IS_CONTACT = (contact: string) => {
  return contact
    .toLowerCase()
    .match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
};

export const IS_TAG = (tag: string) => {
  return tag.match(/[a-z0-9_]+/gi);
}