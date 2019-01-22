import Vue from 'vue';

// v-dialogDrag: 弹窗拖拽属性
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    const dragDom = el.querySelector('.el-dialog');

    var i=document.createElement('i');
    let flag = false;
    var is = false;
    i.classList.add('icon','iconfont','icon-quanping');
    dialogHeaderEl.appendChild(i);
    const icon = el.querySelector('.icon');
    icon.style.cssText = 'position: absolute;\n' +
      '    top: 13px;\n' +
      '    right: 54px;\n' +
      '    cursor: pointer;\n' +
      '    font-size: 18px;\n' +
      '    color: #909399;\n';
    let styTop = "";
    let styWid = "";
    //el-icon-close
    icon.onclick = (e) =>{
      document.onmousemove = null;
      document.onmouseup = null;
      const dialogBody = $('.el-dialog').find(".el-dialog__body");
      if(flag){
        is = false;
        i.classList.remove('icon-tuichuquanping');
        i.classList.add('icon-quanping');
        dialogBody.css('height','auto');
        dragDom.style.cssText = `width: ${styWid};height:auto;margin-top: ${styTop};`;
      }else{
        is = true;
        styTop = style(dragDom,'margin-top');
        styWid = style(dragDom,'width');

        dragDom.style.cssText = '    width: 100%;\n' +
          '    margin-top: 0;\n' +
          '    margin-bottom: 0;\n' +
          '    height: 100%;\n' +
          '    color: #909399;\n' +
          '    overflow: auto;';
        dialogBody.css('height','calc(100% - 95px)');
        i.classList.remove('icon-quanping');
        i.classList.add('icon-tuichuquanping');

      }
      flag = !flag;
    };

    //dialogHeaderEl.style.cursor = 'move';
    dialogHeaderEl.style.cssText += ';cursor:default;'
    dragDom.style.cssText += ';top:0px;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (function() {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr];
      } else{
        return (dom, attr) => getComputedStyle(dom, false)[attr];
      }
    })()
    const style = (function() {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr];
      } else{
        return (dom, attr) => getComputedStyle(dom, false)[attr];
      }
    })()
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;
      const screenWidth = document.body.clientWidth; // body当前宽度
      const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

      const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
      const dragDomheight = dragDom.offsetHeight; // 对话框高度

      const minDragDomLeft = dragDom.offsetLeft;
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

      const minDragDomTop = dragDom.offsetTop;
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;


      // 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, 'left');
      let styT = sty(dragDom, 'top');

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if(styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
      }else {
        styL = +styL.replace(/\px/g, '');
        styT = +styT.replace(/\px/g, '');
      };

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        // 边界处理
        if (-(left) > minDragDomLeft) {
          left = -(minDragDomLeft);
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft;
        }
        //
        // if (-(top) > minDragDomTop) {
        //   top = -(minDragDomTop);
        // } else if (top > maxDragDomTop) {
        //   top = maxDragDomTop;
        // }

        // 移动当前元素
        if(!is){
          dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
        }

      };

      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
})
