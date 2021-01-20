/*
 * @Author: liru
 * @Date: 2021-01-07 16:11:56
 * @Last Modified by: liru
 * @Last Modified time: 2021-01-20 11:17:59
 * @Desc: 描述 支持组建异步加载，将组建出现在视口范围内则渲染真实组件，否则渲染一个占位组件 */
import React, { Component } from 'react';

interface Params {
  TargetComponent: any;
  CustomPlaceholder?: any;
  placeholderStyle?: any;
  distance?: number;
}

const defaultStyle = {
  minHeight: '200px',
  background: '#f9f8f9',
  borderRadius: 8,
  marginBottom: '10px',
};

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

export default function (
  {
    TargetComponent = null,
    CustomPlaceholder = null,
    placeholderStyle = null,
    distance = 0,
  }: Params = {
    TargetComponent: null,
  }
) {
  if (!TargetComponent) {
    return <div>请配置异步加载的组件!!!!!!! </div>;
  }

  const mergeStyle = placeholderStyle
    ? { ...defaultStyle, ...placeholderStyle }
    : defaultStyle;

  return class LazyComponent extends Component {
    state: {
      isTrueRender: boolean;
      customComId: string;
    };
    lazyCom: any;
    timer: any;

    constructor(props: any) {
      super(props);
      this.timer = null;
      this.state = {
        isTrueRender: false,
        customComId: '__async_painter_custom_container__',
      };
    }

    render() {
      return this.state.isTrueRender ? (
        <TargetComponent {...this.props} />
      ) : (
        (CustomPlaceholder && (
          <div id={this.state.customComId}>
            <CustomPlaceholder />
          </div>
        )) || (
          <div
            ref={(dom) => {
              this.lazyCom = dom;
            }}
            style={mergeStyle}
          />
        )
      );
    }

    componentDidMount() {
      if (CustomPlaceholder) {
        this.lazyCom = document.querySelector(`#${this.state.customComId}`);
      }

      if (!this.state.isTrueRender) {
        if (
          window.IntersectionObserver &&
          typeof window.IntersectionObserver === 'function'
        ) {
          // 支持IntersectionObserver的浏览器
          this.initIo();
        } else {
          window.addEventListener('scroll', this.measure);
        }
      }
    }

    /**
     *以offsetTop的形式计算可见
     *
     */
    measure = () => {
      const { lazyCom } = this;
      const { innerHeight: winHeight } = window;

      if (!lazyCom || !lazyCom.getBoundingClientRect) {
        return;
      }

      const rect = lazyCom.getBoundingClientRect();

      if (rect.top <= winHeight + distance) {
        this.trueRender();
      }
    };

    /**
     *以IntersectionObserver的方式监视元素是否出现在可见区域
     *IntersectionObserver 可参考 1,https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API
     *2,http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
     */
    initIo = () => {
      const { lazyCom } = this;
      const io = new IntersectionObserver(
        (entries) => {
          const [{ isIntersecting }] = entries;
          if (isIntersecting) {
            this.trueRender(io);
          }
        },
        {
          root: null,
          threshold: 0,
        }
      );
      io.observe(lazyCom);
    };

    trueRender(io?: any) {
      this.setState(
        {
          isTrueRender: true,
        },
        () => {
          (io && io.disconnect()) ||
            window.removeEventListener('scroll', this.measure);
        }
      );
    }
  };
}
