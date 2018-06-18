import React from 'react';
import ReactDOM from 'react-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class Paginator extends React.Component {

	constructor(props) {
		super(props);
	}
	
	renderPrev(){
		return "prev" in this.props.links ? 					
				<PaginationItem>
					<PaginationLink previous onClick={() => this.props.onNavigate(this.props.links.prev.href)} href="#" />
				</PaginationItem>
				: null;
	}
	
	renderNext(){
		return "next" in this.props.links ? 					
			<PaginationItem>
				<PaginationLink next onClick={() => this.props.onNavigate(this.props.links.next.href)}  href="#" />
			</PaginationItem>
		: null;
	}
	
	renderNumbers(){
		if(this.props.page && this.props.links.self){
			var navLinks = [];
			console.log(this.props.links.self.href);
			for (var i = 0; i < this.props.page.totalPages; i++) {
				let href = this.tratarUrl(this.props.links.self.href, i);
				navLinks.push(
					<PaginationItem key={i} active={i === this.props.page.number}>
						<PaginationLink onClick={() => this.props.onNavigate(href)} href="#">
							{ i + 1 }
						</PaginationLink>
					</PaginationItem>
				);
			}
			return this.props.page.totalPages > 1 ? navLinks : null;
		}
		return null;
	}
	
	tratarUrl(url, page){
		return `${url.split('{')[0]}?size=${this.props.page.size}&page=${page}`;
	}

	render() {
		return (
			<Pagination aria-label="Paginação">
				{this.renderPrev()}
				{this.renderNumbers()}
				{this.renderNext()}
			</Pagination>
		);
	}
}
