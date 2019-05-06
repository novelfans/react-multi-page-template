import * as React from 'react'
import * as Api from '../../api'
const avatar = require('./assets/images/defaultAvatar.png')

const styles = require('./app.less')

export interface IAppState {
  nickName?: string
  userPic?: string
  isBandedUdid: boolean
  openApp: boolean
}

export default class App extends React.Component<{}, IAppState> {
  constructor(props) {
    super(props)
    this.state = {
      isBandedUdid: false,
      openApp: false
    }
  }

  async componentWillMount() {
    try {
      let data = await Api.login()
      this.setState({ ...data })
    } catch (err) {
      console.log('error: ', err)
      this.setState({ openApp: true })
    }
  }

  renderUserInfo() {
    return (
      <div className={styles.top}>
        <div className={styles.user}>
          <img src={this.state.userPic || avatar} />
          <span>{this.state.nickName || '没有昵称'}</span>
        </div>
        <div className={styles.money}>
          <div className={styles.item}>
            <span>我的零钱 提现></span>
            <span>1.00元</span>
          </div>
          <div className={styles.item}>
            <span>累计收益 提现></span>
            <span>1.00元</span>
          </div>
        </div>
      </div>
    )
  }
  renderButtons() {
    if (this.state.openApp) {
      return (
        <span className={styles.btn} onClick={this.openApp.bind(this)}>
          打开助手App
        </span>
      )
    } else if (!this.state.isBandedUdid) {
      return (
        <a className={styles.btn} href="http://localhost:8075/udid.mobileconfig">
          绑定设备
        </a>
      )
    }
    return null
  }

  render() {
    return (
      <div className={styles.app}>
        {this.renderUserInfo()}
        {this.renderButtons()}
      </div>
    )
  }

  openApp() {
    window.location.href = 'yqt://login'
  }
}
