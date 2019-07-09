import React from 'react';
import {connect} from 'react-redux'
import {addTodo, deleteTodo, pushTodo, popTodo} from '../../action/index'
import Carousel from '../../component/carousel'
import { TabBar,NoticeBar,List,Badge } from 'antd-mobile';
import one from "../../assets/images/one.png";
import two from "../../assets/images/two.png";
import three from "../../assets/images/three.jpg";
import four from "../../assets/images/four.jpg";
import mangguo from "../../assets/images/mangguo.jpg";
import pipa from "../../assets/images/pipa.jpg";
import shiliu from "../../assets/images/shiliu.jpg";

import styles from './index.module.less'

@connect(state => ({
    count: state.count,
    list: state.list
}), {addTodo, deleteTodo, pushTodo, popTodo})
class App extends React.Component {
    goToProduct = ()=>{
        this.props.history.push(`/product`)
    }
    render() {
        return (
            <div className={styles.main}>
                <Carousel></Carousel>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    tabBarPosition="top"
                >
                    <TabBar.Item
                        title="限时抢购"
                        key="Life"
                        icon={<img
                            src={one}
                            className={styles.img}
                            alt={''}
                        />
                        }
                        onPress={this.goToProduct}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <img
                                src={four}
                                className={styles.img}
                                alt={''}
                            />
                        }
                        title="时令果蔬"
                        key="Koubei"
                        onPress={() => {
                            this.props.history.push(`/product`)
                        }}
                        data-seed="logId1"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<img
                            src={three}
                            className={styles.img}
                            alt={''}/>}
                        title="热销产品"
                        key="my"
                        onPress={this.goToProduct}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<img
                            src={two}
                            className={styles.img}
                            alt={''}/>}
                        title="新品预定"
                        key="my"
                        onPress={this.goToProduct}
                    >
                    </TabBar.Item>
                </TabBar>
                <div style={{padding:'5px 0',background:'#f5f5f9'}}>
                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 2px' } }}>
                        这个会影响dom渲染，开发环境暂时隐藏
                    </NoticeBar>
                </div>
                <List.Item extra="更多" arrow="horizontal" onClick={this.goToProduct}>
                    <Badge text={0} style={{ marginLeft: 12 }}>芒果</Badge>
                    <Badge text={'new'} style={{ marginLeft: 12 }} />
                </List.Item>
                <img src={mangguo} className={styles.moreImg} alt=""/>
                <List.Item extra="更多" arrow="horizontal" onClick={this.goToProduct}>
                    <Badge text={0} style={{ marginLeft: 12 }}>枇杷</Badge>
                    <Badge text={'new'} style={{ marginLeft: 12 }} />
                </List.Item>
                <img src={pipa} className={styles.moreImg} alt=""/>
                <List.Item extra="更多" arrow="horizontal" onClick={this.goToProduct}>
                    <Badge text={0} style={{ marginLeft: 12 }}>石榴</Badge>
                    <Badge text={'new'} style={{ marginLeft: 12 }} />
                </List.Item>
                <img src={shiliu} className={styles.moreImg} alt=""/>
            </div>
        );
    }
}
export default App;
