export const $ = (...elems) => elems.reduce((a, elem) => a + ' ' + elem(), '');

export const createRender = (components, ref) => () => {
  ref.innerHTML = components();
};
export function _(name) {
  const validate = () => name.replace(/<\/?[^>]+>/g, '');

  let className = '';
  let id = null;

  function result(...children) {
    const ids = id ? id : '';
    return typeof name === 'string'
      ? () =>
          ` <${validate()} id='${ids}' class='${className}' >    ${$(
            ...children,
          )}  </${validate()}> `
      : name(...children); // Пока без рендеринга типо компонент в компоненты ( this.props.children)
  }

  result.className = cls => {
    className = cls;
    return result;
  };
  result.id = i => {
    id = i;
    return result;
  };
  return result;
}
