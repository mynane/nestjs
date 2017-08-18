本地eslint 验证  sudo npm i -g eslint-config-airbnb eslint babel-eslint eslint-plugin-import eslint-plugin-jsx-a11y 

切记 子组件一定要用 PureComponent 避免父组件改变了state 的时候子组件在不需要 render 的时候也会调用 render() 类似: import pureRender from 'pure-render-decorator';

transform-runtime
https://segmentfault.com/q/1010000005596587?from=singlemessage&isappinstalled=1

transform-decorators-legacy
ES7

transform-async-to-generator
用于支持async/await书写方式

transform-do-expressions
用于支持JSX书写 if else 语句

<code>
    render() {
        return (
            <div className='myComponent'>
            {do {
                if(color === 'blue') { <BlueComponent/>; }
                if(color === 'red') { <RedComponent/>; }
                if(color === 'green') { <GreenComponent/>; }
            }}
        </div>
        )
    }
</code>