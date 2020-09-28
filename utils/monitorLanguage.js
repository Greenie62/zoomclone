

var swears=['fuck','shit','asshole','bitch','cunt','slut','pussy','nigger','spic','cracker','kyke','whore'];



module.exports = function monitorLanguage(message){
    let violations=[];

    let counter=0;

    message.split(" ").forEach(word=>{
        if(swears.indexOf(word) !== -1){
            counter++
            violations.push(swears[swears.indexOf(word)])
        }
    })

    if(counter === 0)return {msg:"Clean message! :)"}

    return {error:`Uh-oh, it was spotted you used the ${violations.length} inappropriate words, please don't!`}

}
