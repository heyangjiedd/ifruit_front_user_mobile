import React from 'react';
import {TabBar,} from 'antd-mobile';
import {Redirect, Route} from "react-router-dom";
import Info from "@/page/info/Info";
import Activity from "@/page/activity/Activity";
import Main from "@/page/main/Main";
import home from '@/assets/icon/home.svg'
import home_select from '@/assets/icon/home_select.svg'
import about from '@/assets/icon/about.svg'
import about_select from '@/assets/icon/about_select.svg'
import user from '@/assets/icon/user.svg'
import user_select from '@/assets/icon/user_select.svg'
import connect from "react-redux/es/connect/connect";

import styles from './index.module.less'

@connect((state) => ({
    user: state.user,
}))
class TabBarHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            fullScreen: false,
        };
    }

    componentWillMount() {
    }

    componentDidMount() {

    }

    render() {
        return (<div>
            <div style={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    tabBarPosition="top"
                >
                    <TabBar.Item
                        title="首页"
                        key="Life"
                        icon={<img
                            src={home}
                            width='22px'
                            height='22px'
                            alt={''}
                        />
                        }
                        selectedIcon={<img
                            src={home_select}
                            width='22px'
                            height='22px'
                            alt={''}
                        />
                        }
                        selected={this.props.history.location.pathname === '/home'}
                        onPress={() => {
                            this.props.history.push(`/home`)
                        }}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <img
                                src={about}
                                width='22px'
                                height='22px'
                                alt={''}
                            />
                        }
                        selectedIcon={
                            <img
                                src={about_select}
                                width='22px'
                                height='22px'
                                alt={''}
                            />
                        }
                        title="简介"
                        key="Koubei"
                        selected={this.props.history.location.pathname === '/activity'}
                        onPress={() => {
                            this.props.history.push(`/activity`)
                        }}
                        data-seed="logId1"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<img
                            src={user}
                            width='22px'
                            height='22px'
                            alt={''}/>}
                        selectedIcon={<img
                            src={user_select}
                            width='22px'
                            height='22px'
                            alt={''}/>}
                        title="我的"
                        key="my"
                        selected={this.props.history.location.pathname === '/info'}
                        onPress={() => {
                            this.props.history.push(`/info`)
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
            <div className={styles.main}>
                <Route path="/" exact render={() => (
                    <Redirect to="/home"/>
                )}></Route>
                <Route path={`/home`} component={Main}/>
                <Route path={`/activity`} component={Activity}/>
                <Route path={`/info`} render={() => (
                    this.props.user ? (
                        <Info/>
                    ) : (
                        <Redirect to="/login"/>
                    ))}/>
            </div>
        </div>)
    }

    componentWillReceiveProps() {

    }

    shouldComponentUpdate() {
        return true
    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }
}

export default TabBarHome;
