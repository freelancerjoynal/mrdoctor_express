export const getProfile = (req, res) => {
    // Accessing user data attached by the protectedRoute middleware
    res.json({
        message: 'Protected data accessed successfully',
        user: req.user
    });
};
//# sourceMappingURL=profileController.js.map