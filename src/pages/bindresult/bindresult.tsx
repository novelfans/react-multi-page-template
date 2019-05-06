import * as React from 'react'

const styles = require('./bindresult.less')

interface IBindState {
  bindSuccess: boolean
}

export default class BindResult extends React.Component<{}, IBindState> {
  constructor(props) {
    super(props)
    this.state = {
      bindSuccess: false
    }
  }
  componentWillMount() {
    const success = /\?success=1/i.test(window.location.href)
    this.setState({ bindSuccess: success })
  }

  render() {
    const image = this.state.bindSuccess
      ? require('./assets/images/bind-success.png')
      : require('./assets/images/bind-error.png')
    const tip = this.state.bindSuccess ? '绑定成功' : '绑定失败'
    const btnTitle = this.state.bindSuccess ? '开始做任务' : '重新绑定'

    return (
      <div className={styles.page}>
        <div className={styles.content}>
          <img src={image} />
          <span>{tip}</span>
          {this.state.bindSuccess ? <span>你的设备已绑定成功，开始做任务赚钱吧！</span> : <span>再试一次吧~</span>}

          <a href={this.state.bindSuccess ? '/yqt/pages/home' : 'http://localhost:8075/udid.mobileconfig'}>
            {btnTitle}
          </a>
        </div>
      </div>
    )
  }
}
