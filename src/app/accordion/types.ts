export type Config = {
  // selector?: String,
  multi?: boolean
};
export type Menu = {
  name: string,
  iconClass: string,
  active: boolean,
  submenu: { name: string, url: string }[]
}
