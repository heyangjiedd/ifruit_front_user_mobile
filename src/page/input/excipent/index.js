import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {createForm} from 'rc-form';
import {NavBar, Icon, List, InputItem, Flex, WhiteSpace,TextareaItem, Toast, Button,Picker,} from 'antd-mobile';
import {queryNoPage as getProductTag} from '@/api/excipentTag'
import {queryNoPage as getFarmer} from '@/api/product'
import {add} from '@/api/excipent'
import {listToTreeData,getDeep} from '@/utils'

@createForm()
@injectIntl
class Index extends React.Component {
    state = {
        excipentTagTree:[],
        product:[],
    }
    componentDidMount(){
        getProductTag().then(res=>{
            this.setState({
                excipentTagTree:listToTreeData(res.data, ['id', 'value', 'name', 'label']),
            })
        })
        this.fetchFarmer();
    }
    fetchFarmer(){
        getFarmer({pid:'0'}).then(res=>{
            this.setState({
                product:res.data.map(item=>({
                    value:item.id,
                    label:item.name,
                }))
            })
        })
    }
    handleClick = () => {
        const {form} = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) {
                Toast.fail(err[Object.keys(err)[0]].errors[0].message, 1, () => {
                }, true)
                return;
            }
            add({...fieldsValue,
                productId:fieldsValue.productId?fieldsValue.productId[0]:undefined,
                tagIds:fieldsValue.tagIds.join(',')}).then(()=>{
                form.resetFields();
                this.props.history.goBack(-1)
            })
        });
    }

    render() {
        const {getFieldProps} = this.props.form;
        const {intl} = this.props;
        return (
            <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack(-1)}
                >录入辅料信息</NavBar>
                <List className="picker-list">
                    <InputItem className={'required'} {...getFieldProps('name', {
                        rules: [{ required: true, message: '请输入名称！' }],
                    })} clear placeholder="请输入名称">名称</InputItem>
                    <Picker
                        title="辅料标签"
                        extra="请选择"
                        {...getFieldProps('tagIds', {
                            initialValue: [],
                        })}
                        data={this.state.excipentTagTree}
                    >
                        <List.Item arrow="horizontal">辅料标签</List.Item>
                    </Picker>
                    <Picker data={this.state.product} cols={1} {...getFieldProps('productId')} >
                        <List.Item arrow="horizontal">产品</List.Item>
                    </Picker>
                    <InputItem{...getFieldProps('num')} clear placeholder="请输入地址">用量(kg)</InputItem>
                </List>
                <Button style={{width: '100%',bottom:0,position:'absolute'}} type="primary" onClick={this.handleClick}>确定</Button>
            </div>
        );
    }
}

export default Index;
