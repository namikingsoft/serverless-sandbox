type MaybeError = Error | null | undefined
type Callback = (err: Error, data: any) => void
type Resolve = (data: any) => void
type Reject = (err: Error) => void

export default class Promisifier {
  constructor(
    private resolve: Resolve,
    private reject: Reject
  ) {}

  get callback(): Callback {
    return (err: Error, data: any) => {
      if (err) {
        this.reject(err)
      } else {
        this.resolve(data)
      }
    }
  }
}
