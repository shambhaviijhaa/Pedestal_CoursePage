// scripts.js

document.getElementById('price-range').addEventListener('input', function() {
    document.getElementById('price-value').textContent = `$${this.value}`;
});

document.getElementById('filter-button').addEventListener('click', function() {
    const searchQuery = document.getElementById('search-box').value.toLowerCase();
    const selectedRating = document.querySelector('input[name="rating"]:checked')?.value;
    const selectedDurations = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                                    .map(checkbox => checkbox.value);
    const selectedPrice = document.getElementById('price-range').value;
    
    console.log('Search Query:', searchQuery);
    console.log('Selected Rating:', selectedRating);
    console.log('Selected Durations:', selectedDurations);
    console.log('Selected Price:', selectedPrice);
    
    // Add your course filtering logic here using the selected values
    
    // Example of filtered courses
    let courses = [
        // Example course objects
        { title: "Course 1", category: "web-development", rating: 4.5, duration: 10, price: 100 },
        { title: "Course 2", category: "javascript", rating: 3.5, duration: 5, price: 50 }
        // Add more courses as needed
    ];
    
    let filteredCourses = courses.filter(course => {
        return (!searchQuery || course.title.toLowerCase().includes(searchQuery)) &&
               (!selectedRating || course.rating >= selectedRating) &&
               (!selectedDurations.length || selectedDurations.some(duration => {
                   const [min, max] = duration.split('-').map(Number);
                   return course.duration >= min && (!max || course.duration <= max);
               })) &&
               course.price <= selectedPrice;
    });
    
    console.log(filteredCourses);
    // You can now display the filtered courses on your page
});
