// css propsがないというtsエラーが出るため
export {}
declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: any
  }
}
