import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./AskedQuestion.css"
import { useState } from "react";

const AskedQuestion = () => {

    const [answer, setAnswer] = useState(false)


    const questions = [
        {
            id: 1,
            question: "How does crowdfunding work?",
            answer: "Crowdfunding is a method of raising funds from a large number of people, typically online, to support a project, business, or cause. It works by individuals or organizations creating a campaign and inviting others to contribute financially to help achieve a specific goal."
        },
        {
            id: 2,
            question: "How do I start a crowdfunding campaign on your platform?",
            answer: "To start a campaign, simply sign up on our platform, create a detailed project page outlining your goals, funding target, and rewards for backers. Then, launch your campaign and start promoting it to attract supporters."
        },
        {
            id: 3,
            question: "What types of projects are suitable for crowdfunding?",
            answer: "Virtually any creative, entrepreneurial, or socially impactful project can be funded through crowdfunding. This includes artistic endeavors, tech startups, charitable initiatives, and more."
        },
        {
            id: 4,
            question: "Are there any fees associated with starting a campaign?",
            answer: "Yes, there may be platform fees for hosting your campaign, as well as payment processing fees. However, these fees vary depending on the platform and the type of campaign."
        },
        {
            id: 5,
            question: "How can I promote my crowdfunding campaign?",
            answer: "You can promote your campaign through social media, email marketing, personal networks, press releases, and other marketing channels. Engaging with potential backers and offering compelling updates can also boost visibility."
        },
        {
            id: 6,
            question: "What happens if my campaign doesn't reach its funding goal?",
            answer: "If your campaign doesn't reach its funding goal, you may not receive any funds, depending on the platform's rules. However, some platforms offer flexible funding options where you can keep the funds raised, even if you don't reach your target."
        },
    ]

    return (
        <div className='question'>
            <div className="question-container">
                <div className="q-top">
                    <h1>Frequently Asked Questions</h1>
                    <p>Have another question? Email us at wethepeolpe@gmail.com</p>
                </div>

                <div className="q-bottom">
                    {questions.map((item, index) => {
                        return (
                            <>
                                <div className="q-list">
                                    <div className="q-box" onClick={() => setAnswer(index, !answer)}>
                                        <h3>{item.question}</h3>
                                        {answer !== index ?
                                            <IoIosArrowDown size={22} cursor={"pointer"} />
                                            :
                                            <IoIosArrowUp size={22} cursor={"pointer"} onClick={()=> setAnswer(false)}/>
                                        }
                                    </div>
                                    {answer === index &&
                                        <p>{item.answer}</p>
                                    }
                                </div>
                                <hr />
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AskedQuestion
