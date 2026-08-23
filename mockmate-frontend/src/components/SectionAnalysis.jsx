import {
    CheckCircle,
    AlertTriangle,
    XCircle
} from "lucide-react";

function ProgressBar({ value }) {

    let color = "bg-red-500";

    if (value >= 80)
        color = "bg-green-500";
    else if (value >= 50)
        color = "bg-yellow-500";

    return (

        <div className="w-full">

            <div className="flex justify-between mb-1">

                <span>{value}%</span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">

                <div
                    className={`${color} h-3 rounded-full transition-all duration-700`}
                    style={{
                        width: `${value}%`
                    }}
                />

            </div>

        </div>

    );

}

function SectionAnalysis({ sections }) {

    const data = [

        {
            name: "Contact Information",
            score: sections.contact
        },

        {
            name: "Professional Summary",
            score: sections.summary
        },

        {
            name: "Skills",
            score: sections.skills
        },

        {
            name: "Projects",
            score: sections.projects
        },

        {
            name: "Experience",
            score: sections.experience
        },

        {
            name: "Education",
            score: sections.education
        },

        {
            name: "Certifications",
            score: sections.certifications
        }

    ];

    return (

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

            <h2 className="text-2xl font-bold mb-8">

                Resume Section Analysis

            </h2>

            <div className="space-y-6">

                {

                    data.map((item, index) => (

                        <div key={index}>

                            <div className="flex justify-between items-center mb-2">

                                <div className="flex items-center gap-2">

                                    {

                                        item.score >= 80 ?

                                            <CheckCircle className="text-green-600" />

                                            :

                                            item.score >= 50 ?

                                                <AlertTriangle className="text-yellow-500" />

                                                :

                                                <XCircle className="text-red-600" />

                                    }

                                    <span className="font-semibold">

                                        {item.name}

                                    </span>

                                </div>

                                <span>

                                    {item.score}%

                                </span>

                            </div>

                            <ProgressBar value={item.score} />

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default SectionAnalysis;