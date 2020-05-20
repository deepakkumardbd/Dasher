const express = require('express');
const axios = require('axios');
const visibilityRouter = express.Router();
const requests = require('../utilities/requests');

visibilityRouter.get('/api/forked/', function(req, res) {
    console.log("forked");
    let url = "https://api.github.com/repos/hyperledger-labs/blockchain-automation-framework/forks?page=1&per_page=100";
    requests.get(
                    url,
                    (data)=>{
                        let todayForked = data.data.filter((item)=>{
                            var today = new Date();
                            if(today.setHours(0,0,0,0) == new Date(item["created_at"]).setHours(0,0,0,0)){ 
                                return true; 
                            }
                            else{
                                return false;
                            } 
                        })
                        console.log({ "name": "Forked", "total": data.data.length, today: todayForked.length || 0})
                        res.json({ "name": "Forked" ,"total": data.data.length, today: todayForked.length || 0})
                    }
                );
});

visibilityRouter.get('/api/starred/', function(req, res) {
    console.log("starred");
    let url = "https://api.github.com/repos/hyperledger-labs/blockchain-automation-framework/stargazers?page=1&per_page=100"
    requests.get(
                    url,
                    data => {
                        let todayForked = data.data.filter((item)=>{
                            var today = new Date();
                            if(today.setHours(0,0,0,0) == new Date(item["starred_at"]).setHours(0,0,0,0))
                            { return true; }
                            else{
                                return false;
                            } 
                        })
                        console.log({ "name": "Starred", "total": data.data.length, today: todayForked.length || 0})
                        res.json({ "name": "Starred", "total": data.data.length, today: todayForked.length || 0})
                    },
                    {
                        headers:{
                            "Accept": "application/vnd.github.v3.star+json"
                        }
                    }
                );
});

visibilityRouter.get('/api/contributors/', function(req, res) {
    console.log("contributors");
    let url = "https://api.github.com/repos/hyperledger-labs/blockchain-automation-framework/stats/contributors?page=1&per_page=100";
    requests.get(
                    url,
                    data => {
                        let today = []
                        console.log({ "name": "Contributors", "total": data.data.length, today: today.length})
                        res.json({"name": "Contributors", "total": data.data.length, today: today.length})
                    }
                )
});

visibilityRouter.get('/api/watchers/', function(req, res) {
    console.log("watchers");
    let url = "https://api.github.com/repos/hyperledger-labs/blockchain-automation-framework/subscribers?page=1&per_page=100";
    requests.get(
                    url,
                    data => {
                        let today = []
                        console.log({ "name": "Watchers", "total": data.data.length, today: today.length})
                        res.json({ "name": "Watchers", "total": data.data.length, today: today.length})
                    }
                );
});

visibilityRouter.get('/api/views/', function(req, res) {
    console.log("views");
    let url = "https://api.github.com/repos/hyperledger-labs/blockchain-automation-framework/traffic/views";
    requests.get(
                    url,
                    (data)=>{
                        let views = data.data.views.filter((item)=>{
                            var today = new Date();
                            if(today.setHours(0,0,0,0) == new Date(item["timestamp"]).setHours(0,0,0,0))
                            { return true; }
                            else{
                                return false;
                            } 
                        })
                        console.log({ "name": "Views", "total": data.data.count, today: views[0].count || 0})
                        res.json({ "name": "Views", "total": data.data.count, today: views[0].count || 0})
                    }
                );
});

visibilityRouter.get('/api/unique_visitors/', function(req, res) {
    console.log("Unique_Visitors");
    let url = "https://api.github.com/repos/hyperledger-labs/blockchain-automation-framework/traffic/views";
    requests.get(
                url, 
                data => {
                    let views = data.data.views.filter((item)=>{
                        var today = new Date();
                        if(today.setHours(0,0,0,0) == new Date(item["timestamp"]).setHours(0,0,0,0))
                        { return true; }
                        else{
                            return false;
                        } 
                    })
                    console.log({ "name": "Unique Visitors", "total": data.data.count, today: views[0].count || 0})
                    res.json({ "name": "Unique Visitors", "total": data.data.uniques, today: views[0].uniques || 0})
                }
            );
});

module.exports = visibilityRouter;
