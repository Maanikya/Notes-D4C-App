// GET HOMEPAGE
exports.homepage = async (req, res) => {
    const locals = {
        title: "Notes App",
        description: "Save your Notes. Developed using Express and MongoDB."
    }

    if (req.session.passport && req.session.passport.user) {
        res.redirect("/dashboard");
    } else {
        res.render("index", {
            locals,
            layout: "../views/layouts/front-page"
        });
    }
}

// GET ABOUT
exports.about = async (req, res) => {
    const locals = {
        title: "About - Notes App",
        description: "Save your Notes. Developed using Express and MongoDB."
    }
    res.render("about", locals);
}