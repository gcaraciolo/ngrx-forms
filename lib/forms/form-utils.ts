/**
 * @see https://gist.github.com/ghinda/8442a57f22099bdb2e34
 */
export const toFormData = (obj: any, form: any = undefined, namespace: any = undefined) => {
  var fd = form || new FormData();
  var formKey;

  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (
        typeof obj[property] === 'object' &&
        !((obj[property] instanceof File || obj[property] instanceof Blob))
      ) {
        toFormData(obj[property], fd, property);
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
};
