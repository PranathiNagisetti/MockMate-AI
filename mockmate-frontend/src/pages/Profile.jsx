import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Profile() {

  const emptyProfile = {
    name: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    graduationYear: "",
    preferredRole: "",
    skills: "",
    github: "",
    linkedin: "",
    leetcode: "",
    hackerrank: "",
    bio: ""
  };

  const [profile, setProfile] = useState(emptyProfile);

  const [originalProfile, setOriginalProfile] = useState(emptyProfile);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [editing, setEditing] = useState(false);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const res = await API.get("/profile");

      setProfile(res.data);

      setOriginalProfile(res.data);

    }

    catch (err) {

      console.log(err);

      alert("Failed to load profile");

    }

    finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setProfile({

      ...profile,

      [e.target.name]: e.target.value

    });

  };

  const saveProfile = async () => {

    try {

      setSaving(true);

      await API.put("/profile", profile);

      setOriginalProfile(profile);

      setEditing(false);

      alert("Profile Updated Successfully");

    }

    catch (err) {

      console.log(err);

      alert("Failed to update profile");

    }

    finally {

      setSaving(false);

    }

  };

  const cancelEditing = () => {

    setProfile(originalProfile);

    setEditing(false);

  };

  const Field = ({ label, name, multiline = false }) => (

    <div className="mb-6">

      <label className="block text-gray-600 font-semibold mb-2">

        {label}

      </label>

      {editing ? (

        multiline ? (

          <textarea

            rows={4}

            name={name}

            value={profile[name] || ""}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 text-black"

          />

        ) : (

          <input

            type="text"

            name={name}

            value={profile[name] || ""}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 text-black"

          />

        )

      ) : (

        <div className="bg-gray-100 rounded-lg p-3 text-gray-800 min-h-[48px]">

          {profile[name] || "-"}

        </div>

      )}

    </div>

  );

  if (loading) {

    return (

      <>

        <Navbar />

        <div className="flex justify-center items-center h-screen">

          <h2 className="text-2xl font-semibold">

            Loading Profile...

          </h2>

        </div>

      </>

    );

  }

  return (

    <>

      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10">

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10">

          {/* Header */}

          <div className="flex items-center gap-6 mb-10">

            <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center text-white text-4xl font-bold">

              {profile.name
                ? profile.name.charAt(0).toUpperCase()
                : "U"}

            </div>

            <div>

              <h1 className="text-3xl font-bold text-gray-800">

                {profile.name}

              </h1>

              <p className="text-gray-500">

                {profile.email}

              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <Field label="Name" name="name" />

            <div>

              <label className="block text-gray-600 font-semibold mb-2">

                Email

              </label>

              <div className="bg-gray-100 rounded-lg p-3 text-gray-800">

                {profile.email}

              </div>

            </div>

            <Field label="Phone Number" name="phone" />

            <Field label="College" name="college" />

            <Field label="Degree" name="degree" />

            <Field
              label="Graduation Year"
              name="graduationYear"
            />

            <Field
              label="Preferred Role"
              name="preferredRole"
            />

            <Field label="Skills" name="skills" />

            <Field label="GitHub" name="github" />

            <Field label="LinkedIn" name="linkedin" />

            <Field label="LeetCode" name="leetcode" />

            <Field label="HackerRank" name="hackerrank" />

          </div>

          <Field
            label="Bio"
            name="bio"
            multiline={true}
          />

          {/* Buttons */}

          <div className="flex justify-end gap-4 mt-8">

            {!editing ? (

              <button

                onClick={() => setEditing(true)}

                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"

              >

                Edit Profile

              </button>

            ) : (

              <>

                <button

                  onClick={cancelEditing}

                  className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg"

                >

                  Cancel

                </button>

                <button

                  onClick={saveProfile}

                  disabled={saving}

                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"

                >

                  {saving

                    ? "Saving..."

                    : "Save Changes"}

                </button>

              </>

            )}

          </div>

        </div>

      </div>

    </>

  );

}

export default Profile;