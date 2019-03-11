const axios = require('axios')

exports.abrir = (req, res, next) => {
    const url = process.env.ARDUINO
    const func = () => {
        return new Promise((resolve, reject) => {
            setImmediate(() => {
                try{
                    res = axios.get(url)
                    console.log(res)
                    resolve(res)
                    next()
                } 
                catch(err) {
                    console.log(err)
                    reject(err)
                    //pedal loopthrow new Error('erro:', err)
                }
            })
        })
    }
  
    const main = async () => {
        try {
            await func();
        } catch (ex) {
            console.log(ex);
        }
    }
main()
}