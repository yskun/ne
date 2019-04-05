export interface IPage {
  create(
    page
  ): Promise<string>

  switchPage(
    key: string
  ): boolean

  remove(key: string): Promise<boolean>

  getInstance(key: string): boolean | any
}
