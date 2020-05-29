module.exports = class VoteClass{
    constructor(author, question) {
        this.question = question
        this.author = author
        this.voteYes = 0
        this.voteNo = 0
        this.voted = []
    }

    vote(user_, vote_){
        var status = this.alreadyVoted(user_)

        if (status != -1){
            this.voted[status].vote ? this.voteYes-- : this.voteNo--
            this.voted.splice(status, 1)
        }

        var values = {
            user: user_,
            vote: vote_
        }

        vote_ ? this.voteYes++ : this.voteNo++

        this.voted.push(values)
    }

    alreadyVoted(user_){
        for(var i=0; i < this.voted.length; i++){
            if (this.voted[i].user === user_){
                return i
            }
        }
        return -1
    }

    totalVotesYes(){
        return this.voteYes
    }

    totalVotesNo(){
        return this.voteNo
    }

    totalVotes(){
        return this.voteYes + this.voteNo
    }

    result(){
        var result = "\n"
        if (this.voteYes > this.voteNo)
            result += "La majorité a donc voté positivement au sondage. 👍"
        else if(this.voteNo > this.voteYes)
            result += "La majorité a donc voté négativement au sondage. 👎"
        else
            result += "C\'est donc une égalité parfaite entre les votes positifs et négatifs."

        return "Résultat des votes pour le sondage ***\"" + this.question + "\"***  proposé par <@" + this.author.id + "> \nVotes positifs: " + this.voteYes + "\nVotes négatifs: " + this.voteNo + result
    }
}