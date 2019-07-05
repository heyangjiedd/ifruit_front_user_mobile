import React from 'react';
import {BrowserRouter, Route,Switch} from "react-router-dom";
import Home from '../page/home/Home';
import Login from '../page/login/Login';
import {LocaleProvider} from "antd-mobile";
import connect from "react-redux/es/connect/connect";
import {IntlProvider} from 'react-intl';
import {languages} from '../reducer/language_json'

@connect((state) => ({
    language: state.language,
}))
class Index extends React.Component {
    render() {
        let lang = languages.find(item=>{
            return item.lang === this.props.language.lang;
        });
        return (
            <LocaleProvider locale={this.props.language.language}>
                <IntlProvider locale={this.props.language.lang} messages={lang.langs}>
                <BrowserRouter>
                        <Switch>
                            <Route path="/login" exact component={Login}></Route>
                            <Route path="/" component={Home}></Route>
                        </Switch>
                </BrowserRouter>
                </IntlProvider>
            </LocaleProvider>
        )
    }
}
export default Index;


