angular.module('blogController', [])

	// inject the Blog service factory into our controller
	.controller('mainController', ['$scope','$http','Blogs', function($scope, $http, Blogs) {

		$scope.blogData = {};
		$scope.loading = true;
		$scope.limit = 3;
		// GET =====================================================================
		// when landing on the page, get all blogs and show them
		// use the service to get all the blogs
		Blogs.get()
			.success(function(data) {
				$scope.loading = false;
				$scope.blogs = data;
			});

		$scope.createBlog = function() {
				if ($scope.loading || $scope.blogData.title==='' || $scope.blogData.title===undefined) {
					return;
				}
				$scope.loading = true;
				// call the create function from our service (returns a promise object)
				Blogs.create($scope.blogData)

					// if successful creation, call our get function to get all the new blogs
					.success(function(data) {
						$scope.loading = false;
						$scope.blogData = {}; // clear the form so our user is ready to enter another
						$scope.blogs = data; // assign our new list of blogs
					});
		};

		$scope.deleteBlog = function(id) {
			$scope.loading = true;
			Blogs.delete(id)
				// if successful creation, call our get function to get all the new blogs
				.success(function(data) {
					$scope.loading = false;
					$scope.blogs = data; // assign our new list of blogs
				});
		};
		

	}]);