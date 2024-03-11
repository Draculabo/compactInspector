interface ISetting {
  pinned: boolean
}

const defaultSetting: ISetting = {
  pinned: false,
}
const getSetting = async () => {
  const values = (await browser.storage.sync.get(Object.keys(defaultSetting))) as ISetting
  return values
}
const set = async (item: keyof ISetting, value: any) => {
  try {
    const setting = await getSetting()
    if (!(item in Object.keys(setting))) {
      return
    }
    Reflect.set(setting, item, value)
    await browser.storage.sync.set(setting)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
const get = async (key: keyof ISetting) => {
  try {
    const setting = await getSetting()
    if (!(key in Object.keys(setting))) {
      console.error('The specified key does not exist in the object.')
      return
    }
    return Reflect.get(setting, key)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
export { get, getSetting, set }
