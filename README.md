### @ali/tbdx-react-lazy-render
***
延迟加载React组件，适用于PC和Mobile端。

### 安装
`$ tnpm install @ali/tbdx-react-lazy-render `

### 使用说明
**在一个页面很长的时候，为了优化首屏的加载效率，可以使用@ali/tbdx-react-lazy-render这个组建对你原有的组建进行一层包装，他就会在还没有出现在屏幕可视区域之前不会加载你的组件**

例如：
```
import AsyncPainter from "@ali/tbdx-react-lazy-render";

function App() {
	return (<div>
		你的组建
	</div>);
}

export default AsyncPainter({
  TargetComponent: App
});
```

### 组建参数

|接口|是否必传|类型|默认|说明|
|----|----|----|----|----|
|TargetComponent|是|ReactComponent|null|你那个需要异步加载的组件|
|distance|否|number|0|当你那个组建距离可视区域多远距离时候开始加载|
|placeholderStyle|否|object|看下面|当你那个组件还没有加载之前，默认会预先加载一个站位组件，这个组件必须设置一个高度才有效果，默认高度200px，如果要改变就在这个字段里设置样式即可|
|CustomPlaceholder|否|ReactComponent|空div元素|如果你对默认展位组件不满意，你可以通过这个字段自定义占位组件|

placeholderStyle默认:
```
{
  minHeight: '200px',
  background: '#f9f8f9',
  borderRadius: 8,
  marginBottom: '10px',
}
```


