/*
 * @Author: liru 
 * @Date: 2021-01-07 16:11:56 
 * @Last Modified by: liru
 * @Last Modified time: 2021-01-08 16:58:23
 * @Desc: 描述 支持组建异步加载，将组建出现在视口范围内则渲染真实组件，否则渲染一个占位组件 */
import React, { Component } from 'react';

const defaultStyle = {
  minHeight: '200px',
  background: '#f9f8f9',
  borderRadius: 8,
  marginBottom: '10px'
}

/**
 *
 *
 * @export
 * @param {react component} { TargetComponent = 要异步加载的组建【必】 }
 * @param {number} { distance = 距离视口距离多远开始渲染真是组件【选】【默0】 }
 * @param {object} { placeholderStyle = 默认占位组建样式【选】【默-defaultStyle】 }
 * @param {react component} { CustomPlaceholder = 自定义占位组建【选】 }
 * @return {react component} { 包装后的react组建 }
 */
export default function ({ TargetComponent = null, CustomPlaceholder = null, placeholderStyle = null, distance = 0 } = {}) {
  if (!TargetComponent) {
    return <div>请配置异步加载的组件!!!!!!!</div>
  }

  const mergeStyle = placeholderStyle ? { ...defaultStyle, ...placeholderStyle } : defaultStyle;

  return class LazyComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isTrueRender: false,
        timer: null,
        customComId: '__async_painter_custom_container__'
      }
    }

    render() {
      return this.state.isTrueRender
        ? <TargetComponent {...this.props} />
        : (
          (CustomPlaceholder && <div id={this.state.customComId}><CustomPlaceholder /></div>)
          ||
          <div ref={dom => this.lazyCom = dom} style={mergeStyle} />
        );
    }

    componentDidMount() {
      if (CustomPlaceholder) {
        this.lazyCom = document.querySelector(`#${this.state.customComId}`);
      }
      this.checkRender();
      window.addEventListener('scroll', this.checkRender);
    }

    checkRender = () => {
      if (this.state.isTrueRender) {
        console.log("already render removeEventListener");
        return;
      }

      let { timer } = this;
      if (timer) {
        clearTimeout(timer);
      }

      this.timer = setTimeout(this.measure, 0);

    }

    measure = () => {
      let lazyCom = this.lazyCom,
        lazyComOffsetTop = lazyCom.offsetTop;

      let bodyEle = document.body,
        { clientHeight: bodyClientHeight } = bodyEle;

      let documentEle = document.documentElement,
        { scrollTop: documentScrollTop } = documentEle;

      if (documentScrollTop + bodyClientHeight >= lazyComOffsetTop - distance) {
        this.setState({
          isTrueRender: true
        }, () => {
          window.removeEventListener('scroll', this.checkRender);
        });
      }
    }

  }
}