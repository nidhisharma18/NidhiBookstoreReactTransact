package business.book;

public record Book(long bookId,
				   String title,
				   String author,
				   String description,
				   int price,
				   boolean isPublic,
				   long categoryId
)
{}
